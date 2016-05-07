/* eslint-disable no-constant-condition */

import T from '../lib/twitter-client';
import { eventChannel, takeEvery } from 'redux-saga';
import { fork, take, call, put, cancel } from 'redux-saga/effects';
import { recieveTweet } from '../actions/tweets';

const subscribe = (stream, account) => (
  eventChannel(emit => {
    console.dir('Subscribe user stream')
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
    stream.on('error', error => {
      console.error('Error occurred on stream', error);
      stream.removeAllListeners('data');
      stream.removeAllListeners('error');
      stream.removeAllListeners('end');
      stream.destroy();
      console.log('Stream destoried');
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

function connectUserStream({ accessToken, accessTokenSecret }) {
  const t = new T(accessToken, accessTokenSecret);
  return new Promise(resolve => {
    t.client.stream('user', stream => {
      resolve(stream);
    });
  });
}

export function* watchTweet(account) {
  const stream = yield connectUserStream(account);
  console.log('stream!!!!!!!!!!!')
  let channel = yield call(subscribe, stream, account);
  // yield fork(watchTweet, channel);
  console.log('mmmmmmmmmmm!!!!!!!!!!!');

  stream.on('error', error => {
    console.error('Error occurred on stream', error);
    stream.removeAllListeners('data');
    stream.removeAllListeners('error');
    // stream.removeAllListeners('end');
    stream.destroy();
    console.log('Stream destoried');
    const stream = yield connectUserStream(account).then(stream => {
      let channel = yield call(subscribe, stream, account);
    });
    console.log('stream!!!!!!!!!!!')
  });

  while (true) {
    const action = yield take(channel);
    yield put(action);
  }
}

export function* watchConnect() {
  while (true) {
    const { payload: { account } } = yield take('ADD_COLUMN');
    // should bellow sequence separarte to another saga and fork?
    yield fork(watchTweet, account);

    //const stream = yield connectUserStream(account);
    //console.log('stream!!!!!!!!!!!')
    //const channel = yield call(subscribe, stream, account);
    //yield fork(watchTweet, channel);
    //console.log('mmmmmmmmmmm!!!!!!!!!!!');
//
//    stream.on('error', error => {
//      console.error('Error occurred on stream', error);
//      stream.removeAllListeners('data');
//      stream.removeAllListeners('error');
//      // stream.removeAllListeners('end');
//      stream.destroy();
//      console.log('Stream destoried');
//    });

  }
}

export default function* rootSaga() {
  yield [
    fork(watchConnect),
    fork(watchDisconnect),
  ];
}
