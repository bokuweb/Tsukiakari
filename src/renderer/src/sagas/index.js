import { fork } from 'redux-saga/effects';
import tweetsSaga from './tweets';
import accountSaga from './accounts';

export default function* rootSaga() {
  yield [
    fork(tweetsSaga),
    fork(accountSaga),
  ];
}

