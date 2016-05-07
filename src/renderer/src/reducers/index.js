import { combineReducers } from 'redux';
import accounts from './accounts';
import tweets from './tweets';
import sidemenu from './sidemenu';
import lightbox from './lightbox';

const rootReducer = combineReducers({
  accounts,
  tweets,
  sidemenu,
  lightbox,
});

export default rootReducer;
