const { app, BrowserWindow, dialog } = require('electron');
const ipc = require('electron').ipcMain

ipc.on('save-dialog', function(event) {
    const options = {
        title: 'Save an Image',
        filters: [
            { name: 'Images', extensions: ['jpg', 'png', 'gif'] }
        ]
    }
    dialog.showSaveDialog(options, function(filename) {
        event.sender.send('saved-file', filename)
    })
})

var mainWindows = null;
app.on('ready', function() {
    mainWindow = new BrowserWindow({ width: 400, height: 150 });
    mainWindow.loadURL(`file://${__dirname}/index.html`);
    mainWindow.on('closed', () => {
        mainWindow = null;
    });
});