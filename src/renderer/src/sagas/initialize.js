/* eslint-disable no-constant-condition */

import { take, fork, put } from 'redux-saga/effects';
import * as accounts from '../actions/accounts';
import log from '../lib/log';

function* watchInitialize() {
  while (true) {
    yield take('INITIALIZE');
    log.debug('Start initialize!!');
    yield put(accounts.loadAccounts());
  }
}
export default function* initializeSaga() {
  yield fork(watchInitialize);
}
