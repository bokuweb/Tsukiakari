import { BrowserWindow, app, ipcMain, shell, powerMonitor } from 'electron';
import Auth from './auth';
import jsonfile from 'jsonfile';
import _ from 'lodash';

let mainWindow = null;

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('ready', () => {
  console.log(app.getPath('userData'));
  let accounts = [];
  global.consumerKey = 'njiDlWzzRl1ReomcCmvhbarN7';
  global.consumerSecret = 'rTOSMuY11adXXUxHHTlcNRWRZsutORnvgAl9eojb19Y77Ub78M';
  const accountFilePath = `${app.getPath('userData')}/accounts.json`;
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
    mainWindow.webContents.openDevTools();
  };

  try {
    accounts = jsonfile.readFileSync(accountFilePath);
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
    if (!_.includes(_.map(accounts, 'id_str'), account.id_str)) accounts.push(account);
    jsonfile.writeFile(accountFilePath, accounts, err => console.log(err));
  };

  ipcMain.on('authenticate-request', event => {
    authenticate().then(account => {
      addAccountUnlessExist(account);
      event.sender.send('authenticate-request-reply', accounts);
    });
  });

  ipcMain.on('accounts-request', event => {
    event.sender.send('accounts-request-reply', accounts);
  });

  ipcMain.on('remove-account-request', (event, account) => {
    console.log(account);
    // event.sender.send('accounts-request-reply', accounts);
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
    mainWindow.webContents.send('suspend');
  });

  powerMonitor.on('resume', () => {
    console.log('resume');
    mainWindow.webContents.send('resume');
  });
});

