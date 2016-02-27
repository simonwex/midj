
'use strict';

const inputs = {
  'beats': require('./lib/beats'),
  'oxygen': require('./lib/oxygen')
};

const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({});
  mainWindow.maximize();

  // and load the index.html of the app.
  mainWindow.loadURL(`file://${__dirname}/app/index.html`);

  // Open the DevTools.
  mainWindow.webContents.openDevTools();

  mainWindow.on('closed', function() {
    mainWindow = null;
  });

  // Subscribe to midi clock events
  Object.keys(inputs).forEach(function (i) {
    inputs[i].subscribe(function(message, data){
      mainWindow.webContents.send(message, data);
    });
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', function () {
    app.quit();
});

app.emit('event');


