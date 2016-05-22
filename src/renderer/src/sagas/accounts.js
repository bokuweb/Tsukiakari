/* eslint-disable no-constant-condition */

import { take } from 'redux-saga/effects';
import { ipcRenderer } from 'electron';

export default function* accountsSaga() {
  while (true) {
    yield take('ADD_ACCOUNT');
    ipcRenderer.send('authenticate-request');
  }
}
