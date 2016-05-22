import { BrowserWindow, app, ipcMain, shell, powerMonitor } from 'electron';
import Auth from './auth';
import jsonfile from 'jsonfile';
import _ from 'lodash';
import util from 'util';

// be closed automatically when the JavaScript object is garbage collected.
let mainWindow = null;

app.on('window-all-closed', () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') app.quit();
});

app.on('ready', () => {
  let accounts = [];
  global.consumerKey = 'njiDlWzzRl1ReomcCmvhbarN7';
  global.consumerSecret = 'rTOSMuY11adXXUxHHTlcNRWRZsutORnvgAl9eojb19Y77Ub78M';
  const accountFilePath = `${app.getPath('cache')}/accounts2.json`;
  const loadMainWindow = () => {
    mainWindow = new BrowserWindow({
      minWidth: 640,
      minHeight: 400,
    });

    mainWindow.webContents.on('new-window', (event, url) => {
      event.preventDefault();
      shell.openExternal(url);
    });

    mainWindow.loadURL(`file://${__dirname}/../../renderer/index.html`);
    // client.create(mainWindow);
    // Open the DevTools.
    mainWindow.webContents.openDevTools();
  };

  try {
    accounts = jsonfile.readFileSync(accountFilePath);
    console.log(util.inspect(accounts));
  } catch (e) {
    console.log(e);
  }

  const authenticate = () => new Promise(resolve => {
    const auth = new Auth();
    auth.request()
      .then(resolve)
      .catch(error => console.log(error));
  });

  const addAccountUnlessExist = (account) => {
    const newAccount = Object.assign({}, account, { id: accounts.length });
    if (!_.includes(_.map(accounts, 'id'), newAccount.id)) accounts.push(newAccount);
    jsonfile.writeFile(accountFilePath, accounts, err => console.log(err));
  };

  ipcMain.on('authenticate-request', event => {
    authenticate().then(account => {
      addAccountUnlessExist(account);
      event.sender.send('authenticate-request-reply', accounts);
    });
  });

  ipcMain.on('accounts-request', event => {
    event.sender.send('accounts-request-reply', accounts)
  });

  if (accounts[0] !== undefined) {
    loadMainWindow();
  } else {
    authenticate().then(account => {
      addAccountUnlessExist(account);
      loadMainWindow();
    });
  }

  powerMonitor.on('suspend', () => {
    console.log("suspend!!!");
    ipcRenderer.send('suspend');
  });

  powerMonitor.on('resume', () => {
    console.log('resume');
    ipcRenderer.send('resume');
  });
});

