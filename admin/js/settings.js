function openTab(tabName) {
    const tabs = document.getElementsByClassName('tab');
    for (let tab of tabs) {
        tab.style.display = 'none';
    }
    document.getElementById(tabName).style.display = 'block';
}

function addUserRow() {
    const table = document.getElementById('userTable').getElementsByTagName('tbody')[0];
    const row = table.insertRow();
    const nameCell = row.insertCell(0);
    const phoneCell = row.insertCell(1);
    const devicesCell = row.insertCell(2);
    nameCell.innerHTML = '<input type="text">';
    phoneCell.innerHTML = '<input type="text">';
    devicesCell.innerHTML = '<input type="text">';
}

function addDeviceRow() {
    const table = document.getElementById('deviceTable').getElementsByTagName('tbody')[0];
    const row = table.insertRow();
    const nameCell = row.insertCell(0);
    const objectCell = row.insertCell(1);
    const dtmfCell = row.insertCell(2);
    nameCell.innerHTML = '<input type="text">';
    objectCell.innerHTML = '<input type="text">';
    dtmfCell.innerHTML = '<input type="text">';
}

function saveModemSettings() {
    const port = document.getElementById('modemPort').value;
    const baudRate = document.getElementById('modemBaudRate').value;
    // Сохраняем настройки модема
    sendToBackend('saveModemSettings', { port, baudRate });
}

function saveUserSettings() {
    const users = [];
    const rows = document.getElementById('userTable').getElementsByTagName('tbody')[0].rows;
    for (let row of rows) {
        const name = row.cells[0].getElementsByTagName('input')[0].value;
        const phone = row.cells[1].getElementsByTagName('input')[0].value;
        const devices = row.cells[2].getElementsByTagName('input')[0].value;
        users.push({ name, phone, devices });
    }
    // Сохраняем настройки пользователей
    sendToBackend('saveUserSettings', { users });
}

function saveDeviceSettings() {
    const devices = [];
    const rows = document.getElementById('deviceTable').getElementsByTagName('tbody')[0].rows;
    for (let row of rows) {
        const name = row.cells[0].getElementsByTagName('input')[0].value;
        const object = row.cells[1].getElementsByTagName('input')[0].value;
        const dtmf = row.cells[2].getElementsByTagName('input')[0].value;
        devices.push({ name, object, dtmf });
    }
    // Сохраняем настройки устройств
    sendToBackend('saveDeviceSettings', { devices });
}

function sendToBackend(command, data) {
    // Отправляем данные на сервер
    fetch(`/${command}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error('Error:', error));
}