import * as types from '../constants/action-types';

const defaultState = {
  accounts: []
};

export default function accounts (state=defaultState, action) {
  switch(action.type){
    case types.LOAD_ACCOUNTS :
    const {accounts} = action;
    return Object.assign({}, state, {accounts});
    default:
      return state;
  }
}
