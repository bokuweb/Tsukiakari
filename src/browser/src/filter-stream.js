import { ipcMain, powerMonitor } from 'electron';
import T from 'twit';

export const watchFilterStreamRequest = () => {
  // const q = [];
  let stream;

  ipcMain.on('request-filterstream-connection', (event, account, params) => {
    if (stream) {
      console.log('Stop filter stream.');
      stream.stop();
      stream = null;
    }
    console.log('start subscribe filter stream');
    const t = new T({
      consumer_key: global.consumerKey,
      consumer_secret: global.consumerSecret,
      access_token: account.accessToken,
      access_token_secret: account.accessTokenSecret,
      timeout_ms: 60 * 1000,
    });
    const queryString = params.q.join(',');
    if (queryString === '') {
      return console.log('query string is empty, can not connect filter stream');
    }
    console.log(queryString);
    stream = t.stream('statuses/filter', { track: queryString });
    stream.on('tweet', tweet => {
      event.sender.send('filterstream-tweet', tweet, params.q);
    });
  });

  powerMonitor.on('suspend', () => {
    console.log('suspend!!!');
    if (stream) stream.stop();
  });

  powerMonitor.on('resume', () => {
    console.log('resume');
    if (stream) stream.start();
  });
};
