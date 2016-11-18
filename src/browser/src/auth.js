const BrowserWindow = require('electron').BrowserWindow;
const shell = require('electron').shell;
const TwitterApi = require('node-twitter-api');

module.exports = class Auth {
  constructor() {

    this.twitter = new TwitterApi({
      callback: 'http://example.com',
      consumerKey,
      consumerSecret
    });
  }

  request() {
    return new Promise((resolve, reject) => {
      this.twitter.getRequestToken((error, requestToken, requestTokenSecret) => {
        if (error) {
          console.log(error);
          reject(error);
        }

        const url = this.twitter.getAuthUrl(requestToken);
        const loginWindow = new BrowserWindow({
          width: 800,
          height: 600
        });

        loginWindow.webContents.on('will-navigate', (event, url) => {
          event.preventDefault();
          const matched = url.match(/\?oauth_token=([^&]*)&oauth_verifier=([^&]*)/);
          if (matched) {
            this.twitter.getAccessToken(requestToken, requestTokenSecret, matched[2], (error, accessToken, accessTokenSecret) => {
              if (error) reject(error);
              else {
                this.twitter.verifyCredentials(accessToken, accessTokenSecret, (error, profile, response) => {
                  if (error) reject(error);
                  else {
                    setTimeout(() => loginWindow.close(), 100);
                    profile.accessToken = accessToken;
                    profile.accessTokenSecret = accessTokenSecret;
                    resolve(profile);
                  }
                });
              }
            });
          } 
        });

        loginWindow.webContents.on('new-window', (event, url) => {
          event.preventDefault();
          shell.openExternal(url);
        });

        // loginWindow.webContents.session.clearStorageData({ storages: ["cookies"] }, () => {});

        loginWindow.webContents.session.clearStorageData({ storages: ['cookies'] }, () => {
          loginWindow.loadURL(url);
        });
      });
    });
  }
};



