/* eslint-disable no-constant-condition */

import { eventChannel } from 'redux-saga';
import { fork, take, call, put, cancel } from 'redux-saga/effects';
import { recieveTweet } from '../actions/tweets';
import { normalize, Schema } from 'normalizr';
import { ipcRenderer } from 'electron'; // eslint-disable-line import/no-unresolved
import log from '../lib/log';

import type { Tweet } from '../../../types/tweet';
import type { EmitterFn } from 'redux-saga';

const tweetSchema = new Schema('tweets', { idAttribute: 'id_str' });

const subscribe = (account: Account) => (
  eventChannel((emit: EmitterFn): Function => {
    const recieve = (_: any, tweet: Tweet) => {
      log.debug('Recieve user stream tweet');
      log.debug(tweet);
      window.requestIdleCallback(() => {
        emit(recieveTweet({
          tweet: normalize(tweet, tweetSchema), account, type: 'Home',
        }));
      }, { timeout: 60000 });
    };
    ipcRenderer.on('userstream-tweet', recieve);
    const unsubscribe = () => {
      ipcRenderer.removeListener('userstream-tweet', recieve);
    };
    return unsubscribe;
  })
);

function *connectStream(account: Account) {
  const channel = yield call(subscribe, account);
  ipcRenderer.send('request-userstream-connection', account);
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

