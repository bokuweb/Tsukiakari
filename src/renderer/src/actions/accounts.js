import jsonfile from 'jsonfile';
import remote from 'remote';



export const loadAccounts = (path) => {
  return dispatch => {
    const path = remote.getGlobal('accountFilePath');
    jsonfile.readFile(path, (err, accounts) => {
      dispatch({type: types.LOAD_ACCOUNTS, accounts});
    });
  };
};

