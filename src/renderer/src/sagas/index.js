import { fork } from 'redux-saga/effects';
import tweetsSaga from './tweets';
import accountSaga from './accounts';
import initialize from './initialize';

export default function* rootSaga() {
  yield [
    fork(initialize),
    fork(tweetsSaga),
    fork(accountSaga),
  ];
}

