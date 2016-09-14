/* @flow */
import type { State } from 'redux';
import type { Account } from '../../../types/account';

export const getFirstAccount = (state: State): Account => state.accounts.accounts[0];
