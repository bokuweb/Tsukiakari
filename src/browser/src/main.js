'use strict';

const { BrowserWindow, app } = require('electron');
const client = require('electron-connect').client;
const Auth = require('./auth');
const jsonfile = require('jsonfile');
const _ = require('lodash');
const ipc = require('ipc');
const util = require('util');

// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

app.on('window-all-closed', () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform != 'darwin') app.quit();
});

app.on('ready', function() {
  let accounts = [];
  global.consumerKey = "njiDlWzzRl1ReomcCmvhbarN7";
  global.consumerSecret = "rTOSMuY11adXXUxHHTlcNRWRZsutORnvgAl9eojb19Y77Ub78M";
  global.accountFilePath = `${app.getPath('cache')}/accounts.json`;

  const loadMainWindow = () => {
    mainWindow = new BrowserWindow({
      'min-width': 640,
      'min-height': 400,
    });
    mainWindow.loadURL(`file://${__dirname}/../../renderer/index.html`);
    client.create(mainWindow);
    // Open the DevTools.
    mainWindow.webContents.openDevTools();
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
    jsonfile.writeFile(accountFilePath, accounts,  err => console.log(err));
  };

  ipc.on('authenticate-request', event => {
    authenticate().then(account => {
      addAccountUnlessExist(account);
      event.sender.send('authenticate-request-reply', accounts);
    });
  });

  ipc.on('accounts-request', event => event.sender.send('accounts-request-reply', accounts));

  if (accounts[0] !== undefined) {
    loadMainWindow();
  } else {
    authenticate().then(account => {
      addAccountUnlessExist(account);
      loadMainWindow();
    });
  }
});

