import { combineReducers } from 'redux';
import accounts from './accounts';
import tweets from './tweets';
import sidemenu from './sidemenu';

const rootReducer = combineReducers({
  accounts,
  tweets,
  sidemenu,
});

export default rootReducer;
