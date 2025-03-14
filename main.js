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

        // Создаем объекты для настроек модема
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

        // Создаем объекты для пользователей
        await this.setObjectNotExistsAsync("users", {
            type: "folder",
            common: {
                name: "Users",
                role: "info",
            },
            native: {},
        });

        // Создаем объекты для устройств
        await this.setObjectNotExistsAsync("devices", {
            type: "folder",
            common: {
                name: "Devices",
                role: "info",
            },
            native: {},
        });

        this.log.info("Adapter ready");
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
        if (typeof obj === "object" && obj.command) {
            this.log.debug(`Received message: ${JSON.stringify(obj)}`);

            switch (obj.command) {
                case "saveSettings":
                    // Сохранение настроек
                    this.config = obj.message;
                    await this.saveConfig();
                    this.log.info("Settings saved");
                    this.sendTo(obj.from, obj.command, { success: true }, obj.callback);
                    break;

                case "closeSettings":
                    // Закрытие настроек
                    this.log.info("Settings closed");
                    this.sendTo(obj.from, obj.command, { success: true }, obj.callback);
                    break;

                default:
                    this.log.warn(`Unknown command: ${obj.command}`);
                    break;
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