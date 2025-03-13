/**
 *
 *      ioBroker DTMF Modem Adapter
 *
 *      (c) 2024 Your Name <your.email@example.com>
 *
 *      MIT License
 *
 */
'use strict';

const { Adapter } = require('@iobroker/adapter-core'); // Get common adapter utils
const SerialPort = require('serialport'); // For modem communication
const Readline = require('@serialport/parser-readline'); // For parsing modem responses

const adapterName = require('./package.json').name.split('.').pop();
let adapter;

let modemPort;
let parser;
let isStopping = false;

function startAdapter(options) {
    options = options || {};
    Object.assign(options, { name: adapterName });

    adapter = new Adapter(options);

    adapter.on('message', obj => obj?.command && processMessage(obj));

    adapter.on('ready', () => main(adapter));

    adapter.on('unload', () => {
        isStopping = true;
        if (modemPort) {
            modemPort.close();
            modemPort = null;
        }
    });

    return adapter;
}

async function processMessage(obj) {
    switch (obj.command) {
        case 'sendDtmf': {
            const { command } = obj.message;
            if (command && modemPort) {
                try {
                    modemPort.write(command + '\r\n'); // Send DTMF command to modem
                    adapter.log.info(`DTMF command sent: ${command}`);
                    adapter.sendTo(obj.from, obj.command, { success: true }, obj.callback);
                } catch (error) {
                    adapter.log.error(`Failed to send DTMF command: ${error}`);
                    adapter.sendTo(obj.from, obj.command, { success: false, error: error.message }, obj.callback);
                }
            } else {
                adapter.sendTo(obj.from, obj.command, { success: false, error: 'Modem not connected' }, obj.callback);
            }
            break;
        }
    }
}

async function connectModem() {
    const { modemPort: port, baudRate } = adapter.config;

    if (!port || !baudRate) {
        adapter.log.error('Modem port or baud rate not configured');
        return;
    }

    try {
        modemPort = new SerialPort(port, { baudRate: parseInt(baudRate, 10) });
        parser = modemPort.pipe(new Readline({ delimiter: '\r\n' }));

        modemPort.on('open', () => {
            adapter.log.info(`Modem connected on port ${port}`);
        });

        modemPort.on('error', error => {
            adapter.log.error(`Modem error: ${error}`);
            modemPort = null;
        });

        parser.on('data', data => {
            adapter.log.debug(`Modem response: ${data}`);
            // Handle modem responses if needed
        });
    } catch (error) {
        adapter.log.error(`Failed to connect to modem: ${error}`);
        modemPort = null;
    }
}

async function main(adapter) {
    // Initialize modem connection
    await connectModem();

    // Subscribe to states if needed
    await adapter.subscribeStates('*');

    adapter.log.info('DTMF Modem adapter started');
}

// If started as allInOne/compact mode => return function to create instance
if (module && module.parent) {
    module.exports = startAdapter;
} else {
    // or start the instance directly
    startAdapter();
}
