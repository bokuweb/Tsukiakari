/* eslint-disable no-constant-condition */

import { eventChannel } from 'redux-saga';
import { take, fork, put } from 'redux-saga/effects';
import { ipcRenderer } from 'electron';
import { updateAccounts } from '../actions/accounts';

const subscribe = () => (
  eventChannel(emit => {
    ipcRenderer.on('remove-account-request-reply', (event, accounts) => {
      emit(updateAccounts({ accounts }));
    });
    ipcRenderer.on('authenticate-request-reply', (event, accounts) => {
      emit(updateAccounts({ accounts }));
    });
    return () => {};
  })
);

function* addAccount() {
  while (true) {
    yield take('ADD_ACCOUNT');
    ipcRenderer.send('authenticate-request');
  }
}

function* removeAccount() {
  while (true) {
    const { payload } = yield take('REMOVE_ACCOUNT');
    ipcRenderer.send('remove-account-request', payload);
  }
}

function* watchAccounts() {
  const channel = subscribe();
  while (true) {
    const action = yield take(channel);
    yield put(action);
  }
}
export default function* accountsSaga() {
  yield [
    fork(watchAccounts),
    fork(addAccount),
    fork(removeAccount),
  ];
}
