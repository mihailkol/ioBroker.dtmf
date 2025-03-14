'use strict';

const utils = require('@iobroker/adapter-core');

class Dtmf extends utils.Adapter {

    constructor(options) {
        super(options);
        this.on('ready', this.onReady.bind(this));
        this.on('message', this.onMessage.bind(this));
    }

    async onReady() {
        // Инициализация адаптера
        this.log.info('Adapter initialized');

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
                def: this.config.modemPort || '/dev/ttyUSB0',
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
                def: this.config.modemBaudRate || 9600,
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
    }

    onMessage(obj) {
        if (obj.command === 'saveSettings') {
            this.config = obj.message; // Обновляем конфигурацию
            this.saveConfig();
            this.log.info('Settings saved');
        }
    }
}

if (module.parent) {
    module.exports = (options) => new Dtmf(options);
} else {
    new Dtmf();
}