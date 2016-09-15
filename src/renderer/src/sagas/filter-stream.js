/* eslint-disable no-constant-condition */

import { eventChannel } from 'redux-saga';
import { fork, take, call, put, cancel, select } from 'redux-saga/effects';
import { recieveTweet } from '../actions/tweets';
import { ipcRenderer } from 'electron'; // eslint-disable-line import/no-unresolved
import log from '../lib/log';
import { normalize, Schema } from 'normalizr';
import { getFirstAccount, getFilterQueries } from './selector';
import type { Account } from '../../../types/account';
import type { Tweet } from '../../../types/tweet';
import type { Channel } from 'redux-saga/effects';
import type { EmitterFn } from 'redux-saga';

const tweetSchema = new Schema('tweets', { idAttribute: 'id_str' });

const subscribe = (account: Account) => (
  eventChannel((emit: EmitterFn) => {
    ipcRenderer.on('filterstream-tweet', (_: any, tweet: Tweet, queries: Array<string>) => {
      log.debug('Recieve serach tweet.');
      window.requestIdleCallback(() => {
        log.debug(tweet);
        for (const q of queries) {
          if (tweet.text.includes(q)) {
            emit(recieveTweet({
              tweet: normalize(tweet, tweetSchema), account, type: 'Search', q,
            }));
          }
        }
      }, { timeout: 1000 });
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

function* watchDeleteColumnRequest() {
  while (true) {
    const { payload: { type } } = yield take('DELETE_COLUMN');
    if (type !== 'Search') continue;
    const account = yield select(getFirstAccount);
    log.debug('Reconnect filter stream because search column deleted');
    const q = yield select(getFilterQueries);
    log.debug('Filter Query', q);
    ipcRenderer.send('request-filterstream-connection', account, { q });
  }
}

export default function* watchConnectFilterStream() {
  let connection;
  yield fork(watchDeleteColumnRequest);
  while (true) {
    yield take('CONNECT_FILTER_STREAM');
    if (connection) {
      yield cancel(connection);
    }
    const account = yield select(getFirstAccount);
    const q = yield select(getFilterQueries);
    ipcRenderer.send('request-filterstream-connection', account, { q });
    const channel = yield call(subscribe, account);
    connection = yield fork(addChannel, channel);
  }
}

