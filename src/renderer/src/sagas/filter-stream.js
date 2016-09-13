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
  stream.stop();
  log.debug('destroy stream');
};

const subscribe = (stream: Object, account: Account, { q }) => (
  eventChannel((emit: EmitterFn) => {
    let interval = 10000;
    const suspendHandler = () => {
      log.debug('suspend');
      rejectStream(stream);
      log.debug('stream destroied');
    };
    const resumeHandler = () => {
      log.debug('resume!!');
      const id = setInterval(() => {
        if (!navigator.onLine) return;
        clearInterval(id);
        emit(connectFilterStream({ account }));
      }, 3000);
    };
    log.debug('remove ipc render listeners');
    ipcRenderer.removeListener('suspend', suspendHandler);
    ipcRenderer.removeListener('resume', resumeHandler);

    stream.on('tweet', (tweet: Object) => {
      log.debug('Recieve serach tweet.');
      interval = 10000;
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

    stream.on('error', () => {
      log.debug('Stream error occured.');
      interval *= 2;
      interval = interval > 240000 ? 240000 : interval;
      rejectStream(stream);
      setTimeout(() => {
        emit(connectFilterStream({ account }));
      }, interval);
    });

    ipcRenderer.once('suspend', suspendHandler);
    ipcRenderer.once('resume', resumeHandler);
  })
);

function connectStream(account: Account, params: FilterParams): Propmise<Object> {
  const t = new T(account.accessToken, account.accessTokenSecret);
  return new Promise((resolve: Promise.resolve) => {
    const stream = t.stream('statuses/filter', { track: params.q })//, (stream: Object) => {
    resolve(stream);
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
      log.debug('==================');
      log.debug(stream);
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

