import { ipcMain, powerMonitor } from 'electron';
import T from 'twit';

export const watchFilterStreamRequest = () => {
  const q = [];
  let stream;

  ipcMain.on('request-filterstream-connection', (event, account, params) => {
    if (stream) {
      console.log('Stop filter stream.');
      stream.stop();
    }
    if (params.q) {
      q.push(params.q);
      console.log(q);
    }
    console.log('start subscribe filter stream');
    const t = new T({
      consumer_key: global.consumerKey,
      consumer_secret: global.consumerSecret,
      access_token: account.accessToken,
      access_token_secret: account.accessTokenSecret,
      timeout_ms: 60 * 1000,
    });
    stream = t.stream('statuses/filter', { track: q.join(',') });
    stream.on('tweet', tweet => {
      event.sender.send('filterstream-tweet', tweet, q);
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
