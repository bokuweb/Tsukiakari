/* @flow */

import { handleActions } from 'redux-actions';

import type { State, Action } from 'redux';
import type { Account } from '../../../types/account';

const defaultState = {
  accounts: [],
};

export default handleActions({
  UPDATE_ACCOUNTS: (state: State, action: Action): State => (
    { accounts: action.payload.accounts }
  ),
  UPDATE_ACCOUNT: (state: State, action: Action): State => {
    const accounts = state.accounts.map((account: Account): State => {
      if (account.id_str === action.payload.account.id_str) {
        return { ...account, ...action.payload.account };
      }
      return account;
    });
    return { accounts };
  },
}, defaultState);

