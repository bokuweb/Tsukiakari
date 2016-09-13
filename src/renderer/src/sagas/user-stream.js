/* eslint-disable no-constant-condition */

import T from '../lib/twitter-client';
import { eventChannel } from 'redux-saga';
import { fork, take, call, put, cancel } from 'redux-saga/effects';
import * as actions from '../actions/tweets';
import { normalize, Schema } from 'normalizr';
import { ipcRenderer } from 'electron'; // eslint-disable-line import/no-unresolved
import log from '../lib/log';

const tweetSchema = new Schema('tweets', { idAttribute: 'id_str' });

const subscribe = (stream, account) => (
  eventChannel(emit => {
    const rejectStream = () => {
      stream.removeAllListeners('data');
      stream.removeAllListeners('error');
      stream.removeAllListeners('favorite');
      stream.removeAllListeners('end');
      // stream.destroy();
      stream.stop();
    };

    // stream.on('data', data => {
    /*
    stream.on('tweet', data => {
      if (data.friends) {

      } else if (data.event) {

      } else if (data.delete) {

      } else if (data.created_at) {
        if (data.retweeted_status && data.retweeted_status.user.id_str === account.id_str) {

        }
        window.requestIdleCallback(() => {
          emit(actions.recieveTweet({
            tweet: normalize(data, tweetSchema), account, type: 'Home',
          }));
        }, { timeout: 60000 });
      }
    });
     */
    /*
    stream.on('favorite', (data) => {
      if (data.source.id_str !== account.id_str) {
        log.debug(data);
        // eslint-disable no-new
        new Notification('Favorited', {
          body: `your tweet is favorited by ${data.source.name}`,
          icon: data.source.profile_image_url_https,
        });
      }
    });
    */
    /*
    stream.on('error', (error) => {
      log.error('Error occurred on stream', error);
      // rejectStream();
      // emit(actions.connectStream({ account, error }));
    });
     */

    ipcRenderer.once('suspend', () => {
      log.debug('suspend');
      rejectStream();
      log.debug('stream destroied');
    });

    ipcRenderer.once('resume', () => {
      log.debug('resume!!');
      const id = setInterval(() => {
        if (!navigator.onLine) return;
        clearInterval(id);
        emit(actions.connectStream({ account }));
      }, 3000);
    });
  })
);

function connectUserStream({ accessToken, accessTokenSecret }) {
  const t = new T(accessToken, accessTokenSecret);
  return new Promise(resolve => {
    const stream = t.client.stream('user'); // , stream => {
    console.log(stream)
    resolve(stream);
    // });
  });
}

function* connectStream(account) {
  let channel;
  try {
    const t = new T(account.accessToken, account.accessTokenSecret);
    const stream = t.stream('user');
    // const stream = yield connectUserStream(account);
    stream.on('tweet', tweet => console.log(tweet));
    stream.on('error', error => console.dir(error));
    channel = yield call(subscribe, stream, account);
  } catch (error) {
    log.debug(error);
  }
  while (true) {
    const action = yield take(channel);
    yield put(action);
  }
}

export default function* watchConnectUserStream() {
  const connection = {};
  while (true) {
    // FIXME:
    const { payload: { account } } = yield take('CONNECT_STREAM');
    if (connection[account.id]) yield cancel(connection[account.id]);
    connection[account.id] = yield fork(connectStream, account);
  }
}

