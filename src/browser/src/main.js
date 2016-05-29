import { BrowserWindow, app, ipcMain, shell, powerMonitor } from 'electron';
import Auth from './auth';
import jsonfile from 'jsonfile';
import _ from 'lodash';

let mainWindow = null;

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('ready', () => {
  let accounts = [];
  global.consumerKey = 'njiDlWzzRl1ReomcCmvhbarN7';
  global.consumerSecret = 'rTOSMuY11adXXUxHHTlcNRWRZsutORnvgAl9eojb19Y77Ub78M';
  const accountFilePath = `${app.getPath('userData')}/accounts.json`;

  try {
    accounts = jsonfile.readFileSync(accountFilePath);
  } catch (e) {
    console.log(e);
  }

  const loadMainWindow = () => {
    mainWindow.accounts = accounts;
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

  const authenticate = () => new Promise((resolve, reject) => {
    const auth = new Auth();
    auth.request()
      .then(resolve)
      .catch(reject);
  });

  const addAccountUnlessExist = account => new Promise((resolve, reject) => {
    if (!_.includes(_.map(accounts, 'id_str'), account.id_str)) accounts.push(account);
    jsonfile.writeFile(accountFilePath, accounts, (err, obj) => {
      if (err) reject(err);
      resolve(obj);
    });
  });

  const signIn = () => new Promise((resolve, reject) => {
    authenticate()
      .then(addAccountUnlessExist)
      .then(resolve)
      .catch(reject);
  });

  const removeAccount = id => {
    // TODO: Refactor
    try {
      accounts = jsonfile.readFileSync(accountFilePath);
    } catch (e) {
      console.log(e);
    }
    accounts = accounts.filter(account => account.id_str !== id);
    jsonfile.writeFileSync(accountFilePath, accounts);
  };

  ipcMain.on('authenticate-request', event => {
    signIn().then(() => event.sender.send('authenticate-request-reply', accounts));
  });

  ipcMain.on('accounts-request', event => {
    event.sender.send('accounts-request-reply', accounts);
  });

  ipcMain.on('remove-account-request', (event, account) => {
    removeAccount(account.id_str);
    if (accounts.length === 0) {
      mainWindow.destroy();
      return signIn().then(() => loadMainWindow());
    }
    return event.sender.send('remove-account-request-reply', accounts);
  });

  if (accounts[0] !== undefined) loadMainWindow();
  else signIn().then(() => loadMainWindow());

  powerMonitor.on('suspend', () => {
    console.log('suspend!!!');
    mainWindow.webContents.send('suspend');
  });

  powerMonitor.on('resume', () => {
    console.log('resume');
    mainWindow.webContents.send('resume');
  });
});

