import { handleActions } from 'redux-actions';

const defaultState = {
  accounts: []
};

export default handleActions({
  LOAD_ACCOUNTS: (state, action) => ({accounts: action.payload.accounts})
}, defaultState);

