import { ipcMain, powerMonitor } from 'electron';
import T from 'twit';

export const watchUserStreamRequest = () => {
  ipcMain.on('request-userstream-connection', (event, account) => {
    const t = new T({
      consumer_key: global.consumerKey,
      consumer_secret: global.consumerSecret,
      access_token: account.accessToken,
      access_token_secret: account.accessTokenSecret,
      timeout_ms: 60 * 1000,
    });
    const stream = t.stream('user');
    stream.on('tweet', tweet => {
      event.sender.send('userstream-tweet', tweet);
    });

    powerMonitor.on('suspend', () => {
      console.log('suspend!!!');
      if (stream) stream.stop();
    });

    powerMonitor.on('resume', () => {
      console.log('resume');
      if (stream) stream.start();
    });
  });
};

