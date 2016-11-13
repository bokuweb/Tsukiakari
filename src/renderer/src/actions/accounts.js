import { createAction } from 'redux-actions';
import { ipcRenderer } from 'electron'; // eslint-disable-line import/no-unresolved

export const loadAccounts = () => (dispatch: Dispacth) => {
  ipcRenderer.send('accounts-request');
  ipcRenderer.on('accounts-request-reply', (_, accounts) => {
    const action = createAction('UPDATE_ACCOUNTS');
    dispatch(action({ accounts }));
  });
};

export const addAccount = createAction('ADD_ACCOUNT');

export const successLoadAccounts = createAction('SUCCESS_LOAD_ACCOUNTS');

export const removeAccount = createAction('REMOVE_ACCOUNT');

export const updateAccounts = createAction('UPDATE_ACCOUNTS');

export const updateAccount = createAction('UPDATE_ACCOUNT');
