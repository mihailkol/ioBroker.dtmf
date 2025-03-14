function openTab(tabName) {
    const tabs = document.getElementsByClassName('tab');
    for (let tab of tabs) {
        tab.style.display = 'none';
    }
    document.getElementById(tabName).style.display = 'block';
}

function saveModemSettings() {
    const port = document.getElementById('modemPort').value;
    const baudRate = document.getElementById('modemBaudRate').value;

    sendToBackend('saveSettings', { modemPort: port, modemBaudRate: baudRate })
        .then(response => {
            if (response.success) {
                alert('Settings saved');
            } else {
                console.error('Failed to save settings:', response.error);
            }
        })
        .catch(error => console.error('Error:', error));
}

function sendToBackend(command, data) {
    return fetch(`/${command}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(response => response.json());
}