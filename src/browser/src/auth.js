'use strict';

const BrowserWindow = require('browser-window');
const TwitterApi = require('node-twitter-api');

class Auth {
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
          matched = url.match(/\?oauth_token=([^&]*)&oauth_verifier=([^&]*)/);
          if (matched) {
            this.twitter.getAccessToken(requestToken, requestTokenSecret, matched[2], (error, accessToken, accessTokenSecret) => {
              if(error) reject(error);
              else {
                this.twitter.verifyCredentials(accessToken, accessTokenSecret, (error, profile, response) => {
                  if(error) reject(error);
                  else {
                    setTimeout(() => loginWindow.close(), 100);
                    profile.accessToken = accessToken;
                    profile.accessTokenSecret = accessTokenSecret;
                    esolve(profile);
                  }
                });
              }
            });
          }
        });

        loginWindow.webContents.session.clearStorageData({}, () => {
          loginWindow.loadUrl(url);
        });
      });
    });
  }
}



