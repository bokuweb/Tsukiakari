/* @flow */
/* eslint-disable no-constant-condition */

import T from '../lib/twitter-client';
import { take, fork, put } from 'redux-saga/effects';
import { loadAccounts, updateAccount } from '../actions/accounts';
import { connectStream, connectSearchStream, loadFriends } from '../actions/tweets';
import { startTimer } from '../actions/initialize';
import log from '../lib/log';

// FIXME
function* connect(accounts: Array<Object>) {
  for (let i = 0; i < accounts.length; i++) {
    yield put(connectStream({ account: accounts[i] }));
  }
  yield put(connectSearchStream({ account: accounts[0] }));
}

// FIXME
function* updateAccounts(accounts: Array<Object>) {
  for (let i = 0; i < accounts.length; i++) {
    const t = new T(accounts[i].accessToken, accounts[i].accessTokenSecret);
    const account = yield t.getUser(accounts[i].id_str, accounts[i].screen_name);
    yield put(updateAccount({ account }));
  }
}

// FIXME
function* loadFollowUsers(accounts: Array<Object>) {
  for (let i = 0; i < accounts.length; i++) {
    const t = new T(accounts[i].accessToken, accounts[i].accessTokenSecret);
    // TODO: Now, load 200 account, fix to load all friends.
    const friends = yield t.getFriends({ count: 200 });
    yield put(loadFriends({ friends }));
  }
}

function* initialize() {
  yield take('INITIALIZE');
  yield put(loadAccounts());
  const { payload: { accounts } } = yield take('SUCCESS_LOAD_ACCOUNTS');
  yield updateAccounts(accounts);
  yield loadFollowUsers(accounts);
  yield connect(accounts);
  yield put(startTimer());
  log.info('initialized');
}

export default function* initializeSaga() {
  yield fork(initialize);
}
