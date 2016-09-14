/* eslint-disable no-constant-condition */

import { eventChannel } from 'redux-saga';
import { fork, take, call, put, cancel } from 'redux-saga/effects';
import { recieveTweet } from '../actions/tweets';
import { ipcRenderer } from 'electron'; // eslint-disable-line import/no-unresolved
import log from '../lib/log';
import { normalize, Schema } from 'normalizr';

import type { Account } from '../../../types/account';
import type { Tweet } from '../../../types/tweet';
import type { Channel } from 'redux-saga/effects';
import type { EmitterFn } from 'redux-saga';

const tweetSchema = new Schema('tweets', { idAttribute: 'id_str' });

const subscribe = (account: Account) => (
  eventChannel((emit: EmitterFn) => {
    ipcRenderer.on('filterstream-tweet', (_: any, tweet: Tweet, q: Array<string>) => {
      log.debug('Recieve serach tweet.');
      window.requestIdleCallback(() => {
        log.debug(tweet);
        for (const word of q) {
          if (tweet.text.includes(word)) {
            emit(recieveTweet({
              tweet: normalize(tweet, tweetSchema), account, type: 'Search', q: word,
            }));
          }
        }
      }, { timeout: 60000 });
    });
    const unsubscribe = () => {
      ipcRenderer.removeAllListeners('filterstream-tweet');
    };
    return unsubscribe;
  })
);

function* addChannel(channel: Channel) {
  while (true) {
    const action = yield take(channel);
    yield put(action);
  }
}

export default function* watchConnectFilterStream() {
  let connection;
  while (true) {
    const { payload: { account, params = {} } } = yield take('CONNECT_FILTER_STREAM');
    if (connection) {
      yield cancel(connection);
    }
    ipcRenderer.send('request-filterstream-connection', account, params);
    const channel = yield call(subscribe, account);
    connection = yield fork(addChannel, channel);
  }
}

