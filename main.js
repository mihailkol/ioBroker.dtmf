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
    }

    /**
     * Инициализация адаптера
     */
    async onReady() {
        this.log.info("Adapter initialized");

        // Логируем текущую конфигурацию
        this.log.info(`Current config: ${JSON.stringify(this.config, null, 2)}`);

        // Создаем объекты пользователей и устройств на основе конфигурации
        await this.createUsersAndDevices(this.config.users, this.config.devices);

        this.log.info('Adapter ready');
    }

    /**
     * Создание объектов пользователей и устройств
     */
    async createUsersAndDevices(users, devices) {
        this.log.info(`Users from config: ${JSON.stringify(users, null, 2)}`);
        this.log.info(`Devices from config: ${JSON.stringify(devices, null, 2)}`);

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
        } else {
            this.log.warn("Users data is not an array or not provided");
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
        } else {
            this.log.warn("Devices data is not an array or not provided");
        }
    }
}

// Экспорт адаптера
if (require.main !== module) {
    module.exports = (options) => new DtmfAdapter(options);
} else {
    (() => new DtmfAdapter())();
}