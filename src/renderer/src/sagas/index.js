/* eslint-disable no-constant-condition */

import T from '../lib/twitter-client';
import { eventChannel, takeEvery } from 'redux-saga';
import { fork, take, call, put, cancel } from 'redux-saga/effects';
import { recieveTweet } from '../actions/tweets';

const subscribe = account => (
  eventChannel(emit => {
    const { accessToken, accessTokenSecret } = account;
    const t = new T(accessToken, accessTokenSecret);
    t.client.stream('user', stream => {
      stream.on('data', data => {
        if (data.friends) {

        } else if (data.event) {

        } else if (data.delete) {

        } else if (data.created_at) {
          //if (data.retweeted_status && data.retweeted_status.user.id_str === user.id_str) {
            // eventEmitter.emit('retweet', data);
          //}
          emit(recieveTweet({ tweet: data, account, type: 'Home' }));
        }
      });
    });
  })
);

/*
function* read(socket) {
  const channel = yield call(subscribe, socket);
  while (true) {
    let action = yield take(channel);
    yield put(action);
  }
}

function* write(socket) {
  while (true) {
    const { payload } = yield take(`${sendMessage}`);
    socket.emit('message', payload);
  }
}

function* handleIO(socket) {
  yield fork(read, socket);
  yield fork(write, socket);
}

 */

// function* test(stream) {
//   console.log('test')
//   const channel = yield call(subscribe, stream);
//   while (true) {
//     console.log('in while')
//     let action = yield take(channel);
//     yield put(action);
//   };
// }

export function* watchDisconnect() {
  yield* takeEvery('DELETE_COLUMN', () => console.log('delete column saga!!!'));
}

export function* watchTweet(channel) {
  while (true) {
    const action = yield take(channel);
    yield put(action);
  }
}

export function* watchConnect() {
  while (true) {
    const action = yield take('ADD_COLUMN');
    const channel = yield call(subscribe, action.payload.account);
    yield fork(watchTweet, channel);
  }
}

export default function* rootSaga() {
  yield [
    fork(watchConnect),
    fork(watchDisconnect),
  ];
}
