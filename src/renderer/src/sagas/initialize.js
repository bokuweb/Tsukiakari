/* eslint-disable no-constant-condition */

import { take, fork, put } from 'redux-saga/effects';
import { loadAccounts } from '../actions/accounts';
import { connectStream } from '../actions/tweets';
import { startTimer } from '../actions/initialize';
import log from '../lib/log';

function* initialize() {
  yield take('INITIALIZE');
  yield put(loadAccounts());
  const { payload: { accounts } } = yield take('SUCCESS_LOAD_ACCOUNTS');
  for (let i = 0; i < accounts.length; i++) {
    yield put(connectStream({ account: accounts[i] }));
  }
  yield put(startTimer());
  log.info('initialized');
}

export default function* initializeSaga() {
  yield fork(initialize);
}
