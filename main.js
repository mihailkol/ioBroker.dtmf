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
                def: '/dev/ttyUSB0',
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
                def: 9600,
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

        this.log.info('Adapter initialized');
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