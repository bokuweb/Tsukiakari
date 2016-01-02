import jsonfile from 'jsonfile';
import remote from 'remote';
import * as types from '../constants/action-types';

export const loadAccounts = () => {
  return dispatch => {
    const path = remote.getGlobal('accountFilePath');
    jsonfile.readFile(path, (err, accounts) => {
      dispatch({type: types.LOAD_ACCOUNTS, accounts});
    });
  };
};

