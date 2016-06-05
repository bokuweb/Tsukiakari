import { combineReducers } from 'redux';
import accounts from './accounts';
import tweets from './tweets';
import sidemenu from './sidemenu';
import lightbox from './lightbox';
import notification from './notification';

const rootReducer = combineReducers({
  accounts,
  tweets,
  sidemenu,
  lightbox,
  notification,
});

export default rootReducer;
