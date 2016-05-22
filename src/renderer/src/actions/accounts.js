import { createAction } from 'redux-actions';
import { ipcRenderer } from 'electron';

export const loadAccounts = () => dispatch => {
  ipcRenderer.send('accounts-request');
  ipcRenderer.on('accounts-request-reply', (_, accounts) => {
    const action = createAction('LOAD_ACCOUNTS');
    dispatch(action({ accounts }));
  });
};

export const addAccount = createAction('ADD_ACCOUNT');
