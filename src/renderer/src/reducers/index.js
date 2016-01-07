import { combineReducers } from 'redux';
import accounts from './accounts';
import tweets from './tweets';

const rootReducer = combineReducers({
  accounts,
  tweets
});

export default rootReducer;
