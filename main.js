"use strict";

const utils = require("@iobroker/adapter-core");

class DtmfAdapter extends utils.Adapter {
    constructor(options = {}) {
        super({
            ...options,
            name: "dtmf", // Название адаптера
        });

        // Подписка на события
        this.on("ready", this.onReady.bind(this));
        this.on("message", this.onMessage.bind(this));
    }

    /**
     * Инициализация адаптера
     */
    async onReady() {
        this.log.info("Adapter initialized");
        this.log.info('Adapter ready');
        await this.updateUsersAndDevices(obj.message.users, obj.message.devices);
    }

    /**
     * Обработка сообщений
     */
    async onMessage(obj) {
        if (typeof obj === 'object' && obj.command) {
            this.log.debug(`Received message: ${JSON.stringify(obj)}`);

            switch (obj.command) {
                case 'saveSettings':
                    // Создаем/обновляем объекты для пользователей и устройств
                    await this.updateUsersAndDevices(obj.message.users, obj.message.devices);

                    this.sendTo(obj.from, obj.command, { success: true }, obj.callback);
                    break;

                default:
                    this.log.warn(`Unknown command: ${obj.command}`);
                    break;
            }
        }
    }

    /**
     * Обновление объектов пользователей и устройств
     */
    async updateUsersAndDevices(users, devices) {
        this.log.info(`Users: ${JSON.stringify(users, null, 2)}`);
        this.log.info(`Devices: ${JSON.stringify(devices, null, 2)}`);

        // Обработка пользователей
        if (Array.isArray(users)) {
            for (const user of users) {
                const userId = `users.${user.name.replace(/[^a-zA-Z0-9]/g, '_')}`;
                this.log.info(`Creating user object: ${userId}`);

                // Создаем объект пользователя
                await this.setObjectNotExistsAsync(userId, {
                    type: 'state',
                    common: {
                        name: user.name,
                        type: 'object',
                        role: 'info',
                        read: true,
                        write: true,
                    },
                    native: {},
                });

                // Устанавливаем значение состояния
                await this.setStateAsync(userId, { phone: user.phone, devices: user.devices }, true);
            }
        }

        // Обработка устройств
        if (Array.isArray(devices)) {
            for (const device of devices) {
                const deviceId = `devices.${device.name.replace(/[^a-zA-Z0-9]/g, '_')}`;
                this.log.info(`Creating device object: ${deviceId}`);

                // Создаем объект устройства
                await this.setObjectNotExistsAsync(deviceId, {
                    type: 'state',
                    common: {
                        name: device.name,
                        type: 'object',
                        role: 'info',
                        read: true,
                        write: true,
                    },
                    native: {},
                });

                // Устанавливаем значение состояния
                await this.setStateAsync(deviceId, { deviceId: device.deviceId, DTMF: device.DTMF }, true);
            }
        }
    }
}

// Экспорт адаптера
if (require.main !== module) {
    module.exports = (options) => new DtmfAdapter(options);
} else {
    (() => new DtmfAdapter())();
}