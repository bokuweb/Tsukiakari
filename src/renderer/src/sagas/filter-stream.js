/* eslint-disable no-constant-condition */

import T from '../lib/twitter-client';
import { eventChannel } from 'redux-saga';
import { fork, take, call, put, cancel } from 'redux-saga/effects';
import { connectFilterStream, recieveTweet } from '../actions/tweets';
import { ipcRenderer } from 'electron'; // eslint-disable-line import/no-unresolved
import log from '../lib/log';
import { normalize, Schema } from 'normalizr';

import type { Account } from '../../../types/account';
import type { FilterParams } from '../../../types/tweet';
import type { Channel } from 'redux-saga/effects';
import type { EmitterFn } from 'redux-saga';

const tweetSchema = new Schema('tweets', { idAttribute: 'id_str' });

const rejectStream = (stream: Object) => {
  stream.removeAllListeners('data');
  stream.removeAllListeners('error');
  stream.destroy();
};

const subscribe = (stream: Object, account: Account, { q }): void => (
  eventChannel((emit: EmitterFn) => {
    stream.on('data', (tweet: Object) => {
      log.debug('Recieve serach tweet.');
      window.requestIdleCallback(() => {
        log.debug(tweet);
        for (const word of q) {
          if (tweet.text.includes(word)) {
            emit(recieveTweet({
              tweet: normalize(tweet, tweetSchema), account, type: 'Search',
            }));
          }
        }
      }, { timeout: 60000 });
    });

    ipcRenderer.once('suspend', () => {
      log.debug('suspend');
      rejectStream(stream);
      log.debug('stream destroied');
    });

    ipcRenderer.once('resume', () => {
      log.debug('resume!!');
      const id = setInterval(() => {
        if (!navigator.onLine) return;
        clearInterval(id);
        emit(connectFilterStream({ account }));
      }, 3000);
    });
  })
);

function connectStream(account: Account, params: FilterParams): Propmise<Object> {
  const t = new T(account.accessToken, account.accessTokenSecret);
  return new Promise((resolve: Promise.resolve) => {
    t.client.stream('statuses/filter', { track: params.q }, (stream: Object) => {
      resolve(stream);
    });
  });
}

function* addChannel(channel: Channel) {
  while (true) {
    const action = yield take(channel);
    yield put(action);
  }
}

export default function* watchConnectFilterStream() {
  let connection;
  let stream;
  const q = [];
  while (true) {
    const { payload: { account, params = {} } } = yield take('CONNECT_FILTER_STREAM');
    // if (type !== 'Search') continue;
    if (connection) {
      yield cancel(connection);
    }
    if (stream) {
      rejectStream(stream);
    }
    if (params.q) {
      q.push(params.q);
    }
    try {
      stream = yield connectStream(account, { q: q.join(',') });
      const channel = yield call(subscribe, stream, account, { q });
      connection = yield fork(addChannel, channel);
    } catch (error) {
      log.error(error);
    }
  }
}

