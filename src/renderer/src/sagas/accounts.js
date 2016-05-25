/* eslint-disable no-constant-condition */

import { take, fork } from 'redux-saga/effects';
import { ipcRenderer } from 'electron';

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

export default function* accountsSaga() {
  yield [
    fork(addAccount),
    fork(removeAccount),
  ];
}
