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
                    // Загружаем текущие объекты пользователей и устройств
                    const users = await this.loadObjectsFromFolder("users");
                    const devices = await this.loadObjectsFromFolder("devices");

                    // Отправляем текущие настройки в интерфейс администрирования
                    const settings = {
                        modemPort: this.config.modemPort,
                        modemBaudRate: this.config.modemBaudRate,
                        users: users,
                        devices: devices,
                    };
                    this.sendTo(obj.from, obj.command, settings, obj.callback);
                    break;

                case 'saveSettings':
                    // Сохранение настроек
                    this.config.modemPort = obj.message.modemPort;
                    this.config.modemBaudRate = obj.message.modemBaudRate;

                    // Удаляем старые объекты пользователей и устройств
                    await this.deleteOldObjects("users");
                    await this.deleteOldObjects("devices");

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
     * Загрузка объектов из папки
     */
    async loadObjectsFromFolder(folder) {
        const objects = await this.getObjectListAsync({
            startkey: `${this.namespace}.${folder}.`,
            endkey: `${this.namespace}.${folder}.\u9999`,
        });

        const result = [];
        for (const obj of objects.rows) {
            const state = await this.getStateAsync(obj.id);
            if (state) {
                result.push({
                    id: obj.id,
                    name: obj.common.name,
                    value: state.val,
                });
            }
        }
        return result;
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
    async updateUsersAndDevices(users, devices) {
        // Обработка пользователей
        if (Array.isArray(users)) {
            for (const user of users) {
                const userId = `users.${user.name.replace(/[^a-zA-Z0-9]/g, '_')}`; // Заменяем спецсимволы в имени
                await this.extendObject(userId, {
                    type: 'state',
                    common: {
                        name: user.name,
                        type: 'string',
                        role: 'info',
                        read: true,
                        write: true, // Разрешаем запись
                    },
                    native: {},
                });

                await this.setStateAsync(userId, user.value, true);
            }
        }

        // Обработка устройств
        if (Array.isArray(devices)) {
            for (const device of devices) {
                const deviceId = `devices.${device.name.replace(/[^a-zA-Z0-9]/g, '_')}`; // Заменяем спецсимволы в имени
                await this.extendObject(deviceId, {
                    type: 'state',
                    common: {
                        name: device.name,
                        type: 'string',
                        role: 'info',
                        read: true,
                        write: true, // Разрешаем запись
                    },
                    native: {},
                });

                await this.setStateAsync(deviceId, device.value, true);
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