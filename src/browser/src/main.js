'use strict';

const electron = require('electron');
const client = require('electron-connect').client;
const app = electron.app;  // Module to control application life.
const Auth = require('./auth');
const jsonfile = require('jsonfile');
const _ = require('lodash');
const ipc = require('ipc');
const util = require('util');
const BrowserWindow = electron.BrowserWindow;  // Module to create native browser window.

// Report crashes to our server.
electron.crashReporter.start();

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform != 'darwin') {
    app.quit();
  }
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
app.on('ready', function() {
  let accounts = [];
  global.consumerKey = "njiDlWzzRl1ReomcCmvhbarN7";
  global.consumerSecret = "rTOSMuY11adXXUxHHTlcNRWRZsutORnvgAl9eojb19Y77Ub78M";
  global.accountFilePath = `${app.getPath('cache')}/accounts.json`;

  const loadMainWindow = () => {
    // Create the browser window.
    mainWindow = new BrowserWindow({width: 800, height: 600});
    // and load the index.html of the app.
    mainWindow.loadURL(`file://${__dirname}/../../renderer/index.html`);
    client.create(mainWindow);
    // Open the DevTools.
    mainWindow.webContents.openDevTools();
    // Emitted when the window is closed.
    mainWindow.on('closed', () => {
      // Dereference the window object, usually you would store windows
      // in an array if your app supports multi windows, this is the time
      // when you should delete the corresponding element.
      mainWindow = null;
    });
  };

  try {
    accounts = jsonfile.readFileSync(accountFilePath);
    console.log(util.inspect(accounts));
  } catch (e) {
    console.log(e);
  }

  const authenticate = () => {
    return new Promise((resolve, reject) => {
      const auth = new Auth();
      auth.request()
        .then(resolve)
        .catch(error => console.log(error));
    });
  };

  const addAccountUnlessExist = (account) => {
    account._id = accounts.length;
    if (!_.includes(_.map(accounts, 'id'), account.id)) accounts.push(account);
    jsonfile.writeFile(accountFilePath, accounts,  err => console.dir(err));
  };

  ipc.on('authenticate-request', (event, arg) => {
    authenticate().then(account => {
      addAccountUnlessExist(account);
      event.sender.send('authenticate-request-reply', accounts);
    });
  });

  if (accounts[0] !== undefined) {
    loadMainWindow();
  } else {
    authenticate().then(account => {
      addAccountUnlessExist(account);
      loadMainWindow();
    });
  }
});

