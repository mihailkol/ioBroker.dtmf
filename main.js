"use strict";

const utils = require("@iobroker/adapter-core");

class DtmfAdapter extends utils.Adapter {
    constructor(options = {}) {
        super({
            ...options,
            name: "dtmf", // Название адаптера
        });

        // Инициализация переменных
        this.users = {}; // Объект для хранения пользователей
        this.devices = {}; // Объект для хранения устройств

        // Подписка на события
        this.on("ready", this.onReady.bind(this));
        this.on("stateChange", this.onStateChange.bind(this));
        this.on("message", this.onMessage.bind(this));
        this.on("unload", this.onUnload.bind(this));
    }

    /**
     * Инициализация адаптера
     */
    async onReady() {
        this.log.info("Adapter initialized");

        // Логируем текущую конфигурацию
        this.log.info(`Current config: ${JSON.stringify(this.config, null, 2)}`);

        // Создаем или обновляем объекты для пользователей и устройств
        await this.updateUsersAndDevices();

        this.log.info('Adapter ready and objects created/updated');
    }

    /**
     * Обработка изменения состояний
     */
    async onStateChange(id, state) {
        if (!state || state.ack) {
            return;
        }

        this.log.debug(`State ${id} changed to ${state.val}`);
    }

    /**
     * Обработка сообщений
     */
    async onMessage(obj) {
        if (typeof obj === 'object' && obj.command) {
            this.log.debug(`Received message: ${JSON.stringify(obj)}`);

            switch (obj.command) {
                case 'getSettings':
                    // Отправляем текущие настройки в интерфейс администрирования
                    const settings = {
                        modemPort: this.config.modemPort,
                        modemBaudRate: this.config.modemBaudRate,
                        users: this.config.users || [],
                        devices: this.config.devices || [],
                    };
                    this.sendTo(obj.from, obj.command, settings, obj.callback);
                    break;

                case 'saveSettings':
                    // Сохранение настроек
                    this.config.modemPort = obj.message.modemPort;
                    this.config.modemBaudRate = obj.message.modemBaudRate;
                    this.config.users = obj.message.users || [];
                    this.config.devices = obj.message.devices || [];

                    // Сохраняем конфигурацию
                    await this.saveConfig();
                    this.log.info('Settings saved');

                    // Удаляем старые объекты пользователей и устройств
                    await this.deleteOldObjects("users");
                    await this.deleteOldObjects("devices");

                    // Создаем/обновляем объекты для пользователей и устройств
                    await this.updateUsersAndDevices();

                    this.sendTo(obj.from, obj.command, { success: true }, obj.callback);
                    break;

                default:
                    this.log.warn(`Unknown command: ${obj.command}`);
                    break;
            }
        }
    }

    /**
     * Удаление старых объектов пользователей или устройств
     */
    async deleteOldObjects(folder) {
        try {
            const objects = await this.getObjectListAsync({
                startkey: `${this.namespace}.${folder}.`,
                endkey: `${this.namespace}.${folder}.\u9999`,
            });

            for (const obj of objects.rows) {
                await this.delObjectAsync(obj.id);
                this.log.debug(`Deleted old object: ${obj.id}`);
            }
        } catch (err) {
            this.log.error(`Error deleting old objects: ${err}`);
        }
    }

    /**
     * Обновление объектов пользователей и устройств
     */
    async updateUsersAndDevices() {
        // Обработка пользователей
        if (Array.isArray(this.config.users)) {
            for (const user of this.config.users) {
                const userId = `users.${user.name.replace(/[^a-zA-Z0-9]/g, '_')}`; // Заменяем спецсимволы в имени
                await this.extendObject(userId, {
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

                await this.extendObject(`${userId}.phone`, {
                    type: 'state',
                    common: {
                        name: `${user.name} Phone`,
                        type: 'string',
                        role: 'info',
                        read: true,
                        write: false,
                    },
                    native: {},
                });

                await this.extendObject(`${userId}.devices`, {
                    type: 'state',
                    common: {
                        name: `${user.name} Devices`,
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

        // Обработка устройств
        if (Array.isArray(this.config.devices)) {
            for (const device of this.config.devices) {
                const deviceId = `devices.${device.name.replace(/[^a-zA-Z0-9]/g, '_')}`; // Заменяем спецсимволы в имени
                await this.extendObject(deviceId, {
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

                await this.extendObject(`${deviceId}.object`, {
                    type: 'state',
                    common: {
                        name: `${device.name} Object`,
                        type: 'string',
                        role: 'info',
                        read: true,
                        write: false,
                    },
                    native: {},
                });

                await this.extendObject(`${deviceId}.dtmfCommand`, {
                    type: 'state',
                    common: {
                        name: `${device.name} DTMF Command`,
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
     * Выгрузка адаптера
     */
    async onUnload(callback) {
        try {
            this.log.info("Adapter shutting down...");
            // Очистка ресурсов, если необходимо
        } catch (err) {
            this.log.error(`Error during shutdown: ${err}`);
        } finally {
            callback();
        }
    }
}

// Экспорт адаптера
if (require.main !== module) {
    module.exports = (options) => new DtmfAdapter(options);
} else {
    (() => new DtmfAdapter())();
}