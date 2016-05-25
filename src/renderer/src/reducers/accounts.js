import { handleActions } from 'redux-actions';

const defaultState = {
  accounts: [],
};

export default handleActions({
  UPDATE_ACCOUNTS: (state, action) => ({ accounts: action.payload.accounts }),
}, defaultState);

