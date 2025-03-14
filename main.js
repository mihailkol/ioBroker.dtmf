'use strict';

const utils = require('@iobroker/adapter-core');

class Dtmf extends utils.Adapter {

    constructor(options) {
        super(options);
        this.on('ready', this.onReady.bind(this));
        this.on('objectChange', this.onObjectChange.bind(this));
        this.on('stateChange', this.onStateChange.bind(this));
    }

    async onReady() {
        // Проверяем, что конфигурация загружена
        if (!this.config) {
            this.config = {}; // Инициализируем пустую конфигурацию
        }

        // Устанавливаем значения по умолчанию, если конфигурация не задана
        this.config.modemPort = this.config.modemPort || "/dev/ttyUSB0";
        this.config.modemBaudRate = this.config.modemBaudRate || 9600;
        this.config.users = this.config.users || [];
        this.config.devices = this.config.devices || [];

        // Создаем объекты для настроек модема
        await this.setObjectNotExistsAsync('modemSettings', {
            type: 'device',
            common: {
                name: 'Modem Settings',
                role: 'info'
            },
            native: {}
        });

        await this.setObjectNotExistsAsync('modemSettings.port', {
            type: 'state',
            common: {
                name: 'Modem Port',
                type: 'string',
                role: 'info',
                def: this.config.modemPort, // Используем значение из конфигурации
                read: true,
                write: true
            },
            native: {}
        });

        await this.setObjectNotExistsAsync('modemSettings.baudRate', {
            type: 'state',
            common: {
                name: 'Modem Baud Rate',
                type: 'number',
                role: 'info',
                def: this.config.modemBaudRate, // Используем значение из конфигурации
                read: true,
                write: true
            },
            native: {}
        });

        // Создаем объекты для пользователей и устройств
        await this.setObjectNotExistsAsync('users', {
            type: 'folder',
            common: {
                name: 'Users',
                role: 'info'
            },
            native: {}
        });

        await this.setObjectNotExistsAsync('devices', {
            type: 'folder',
            common: {
                name: 'Devices',
                role: 'info'
            },
            native: {}
        });

        this.log.info('Adapter initialized and objects created');
    }

    onObjectChange(id, obj) {
        // Обработка изменений объектов
    }

    onStateChange(id, state) {
        // Обработка изменений состояний
    }
}

if (module.parent) {
    module.exports = (options) => new Dtmf(options);
} else {
    new Dtmf();
}