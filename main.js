"use strict";

const utils = require("@iobroker/adapter-core");

class DtmfAdapter extends utils.Adapter {
    constructor(options = {}) {
        super({
            ...options,
            name: "dtmf", // �������� ��������
        });

        // ������������� ����������
        this.users = {}; // ������ ��� �������� �������������
        this.devices = {}; // ������ ��� �������� ���������

        // �������� �� �������
        this.on("ready", this.onReady.bind(this));
        this.on("stateChange", this.onStateChange.bind(this));
        this.on("message", this.onMessage.bind(this));
        this.on("unload", this.onUnload.bind(this));
    }

    /**
     * ������������� ��������
     */
    async onReady() {
        this.log.info("Adapter initialized");

        // ������� ������� ��� �������� ������
        await this.setObjectNotExistsAsync("modemSettings", {
            type: "device",
            common: {
                name: "Modem Settings",
                role: "info",
            },
            native: {},
        });

        await this.setObjectNotExistsAsync("modemSettings.port", {
            type: "state",
            common: {
                name: "Modem Port",
                type: "string",
                role: "info",
                def: this.config.modemPort || "/dev/ttyUSB0",
                read: true,
                write: true,
            },
            native: {},
        });

        await this.setObjectNotExistsAsync("modemSettings.baudRate", {
            type: "state",
            common: {
                name: "Modem Baud Rate",
                type: "number",
                role: "info",
                def: this.config.modemBaudRate || 9600,
                read: true,
                write: true,
            },
            native: {},
        });

        // ������� ������� ��� �������������
        await this.setObjectNotExistsAsync("users", {
            type: "folder",
            common: {
                name: "Users",
                role: "info",
            },
            native: {},
        });

        // ������� ������� ��� ���������
        await this.setObjectNotExistsAsync("devices", {
            type: "folder",
            common: {
                name: "Devices",
                role: "info",
            },
            native: {},
        });

        // ��������� ������� ������������� � ���������
        await this.updateUsersAndDevices();

        this.log.info('Adapter ready and objects created');
    }

    /**
     * ��������� ��������� ���������
     */
    async onStateChange(id, state) {
        if (!state || state.ack) {
            return;
        }

        this.log.debug(`State ${id} changed to ${state.val}`);
    }

    /**
     * ��������� ���������
     */
    async onMessage(obj) {
        if (typeof obj === 'object' && obj.command) {
            this.log.debug(`Received message: ${JSON.stringify(obj)}`);

            switch (obj.command) {
                case 'saveSettings':
                    // ���������� ��������
                    this.config = obj.message;
                    await this.saveConfig();
                    this.log.info('Settings saved');

                    // ���������� ���������
                    this.log.debug(`Modem Port: ${this.config.modemPort}, Baud Rate: ${this.config.modemBaudRate}`);

                    // ������������� ��������� ������� �������� ������
                    await this.setObjectNotExistsAsync('modemSettings.port', {
                        type: 'state',
                        common: {
                            name: 'Modem Port',
                            type: 'string',
                            role: 'info',
                            read: true,
                            write: true,
                        },
                        native: {},
                    });

                    await this.setObjectNotExistsAsync('modemSettings.baudRate', {
                        type: 'state',
                        common: {
                            name: 'Modem Baud Rate',
                            type: 'number',
                            role: 'info',
                            read: true,
                            write: true,
                        },
                        native: {},
                    });

                    // ��������� ���������
                    await this.setStateAsync('modemSettings.port', this.config.modemPort, true);
                    await this.setStateAsync('modemSettings.baudRate', this.config.modemBaudRate, true);

                    // �������/��������� ������� ��� ������������� � ���������
                    await this.updateUsersAndDevices();

                    this.sendTo(obj.from, obj.command, { success: true }, obj.callback);
                    break;

                case 'closeSettings':
                    // �������� ��������
                    this.log.info('Settings closed');
                    this.sendTo(obj.from, obj.command, { success: true }, obj.callback);
                    break;

                default:
                    this.log.warn(`Unknown command: ${obj.command}`);
                    break;
            }
        }
    }

    async updateUsersAndDevices() {
        // ��������� �������������
        if (Array.isArray(this.config.users)) {
            for (const user of this.config.users) {
                const userId = `users.${user.name.replace(/[^a-zA-Z0-9]/g, '_')}`; // �������� ����������� � �����
                await this.setObjectNotExistsAsync(userId, {
                    type: 'state',
                    common: {
                        name: user.name,
                        type: 'string',
                        role: 'info',
                        read: true,
                        write: false,
                    },
                    native: {},
                });

                await this.setStateAsync(`${userId}.phone`, user.phone, true);
                await this.setStateAsync(`${userId}.devices`, user.devices, true);
            }
        }

        // ��������� ���������
        if (Array.isArray(this.config.devices)) {
            for (const device of this.config.devices) {
                const deviceId = `devices.${device.name.replace(/[^a-zA-Z0-9]/g, '_')}`; // �������� ����������� � �����
                await this.setObjectNotExistsAsync(deviceId, {
                    type: 'state',
                    common: {
                        name: device.name,
                        type: 'string',
                        role: 'info',
                        read: true,
                        write: false,
                    },
                    native: {},
                });

                await this.setStateAsync(`${deviceId}.object`, device.object, true);
                await this.setStateAsync(`${deviceId}.dtmfCommand`, device.dtmfCommand, true);
            }
        }
    }

    /**
     * �������� ��������
     */
    async onUnload(callback) {
        try {
            this.log.info("Adapter shutting down...");
            // ������� ��������, ���� ����������
        } catch (err) {
            this.log.error(`Error during shutdown: ${err}`);
        } finally {
            callback();
        }
    }
}

// ������� ��������
if (require.main !== module) {
    module.exports = (options) => new DtmfAdapter(options);
} else {
    (() => new DtmfAdapter())();
}