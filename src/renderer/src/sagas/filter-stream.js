/* eslint-disable no-constant-condition */

import T from '../lib/twitter-client';
import { eventChannel } from 'redux-saga';
import { fork, take, call, put, cancel } from 'redux-saga/effects';
import * as actions from '../actions/tweets';
import { ipcRenderer } from 'electron'; // eslint-disable-line import/no-unresolved
import log from '../lib/log';

const subscribe2 = (stream, account) => (
  eventChannel(emit => {
    const rejectStream = () => {
      stream.removeAllListeners('data');
      stream.removeAllListeners('error');
      stream.destroy();
    };

    stream.on('data', data => {
      log.debug('Recieve serach tweet.');
      log.debug(data);
    });

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

function connectSearchStream2({ accessToken, accessTokenSecret }, params) {
  const t = new T(accessToken, accessTokenSecret);
  return new Promise(resolve => {
    t.client.stream('statuses/filter', { track: params.q }, stream => {
      resolve(stream);
    });
  });
}

function* connectSearchStream(channel /* account, params */) {
  // let channel;
  // try {
  //   const stream = yield connectSearchStream2(account, params);
  //   channel = yield call(subscribe2, stream, account);
  // } catch (error) {
  //   log.error(error);
  // }
  while (true) {
    const action = yield take(channel);
    yield put(action);
  }
}

export default function* watchConnectFilterStream() {
  let connection;
  let stream;
  while (true) {
    const { payload: { account, params, type } } = yield take('ADD_COLUMN');
    if (type !== 'Search') continue;
    if (connection) {
      yield cancel(connection);
    }
    if (stream) {
      stream.removeAllListeners('data');
      stream.removeAllListeners('error');
      stream.destroy();
    }
    try {
      stream = yield connectSearchStream2(account, params);
      const channel = yield call(subscribe2, stream, account);
      connection = yield fork(connectSearchStream, channel);
    } catch (error) {
      log.error(error);
    }
  }
}

