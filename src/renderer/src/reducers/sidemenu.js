import { handleActions } from 'redux-actions';

const defaultState = {
  isAddColumnMenuOpen: false,
  isTweetWindowOpen: false,
};

export default handleActions({
  OPEN_ADD_COLUMN_MENU: state => ({ ...state, isAddColumnMenuOpen: true }),
  CLOSE_ADD_COLUMN_MENU: state => ({ ...state, isAddColumnMenuOpen: false }),
  OPEN_TWEET_WINDOW: state => ({ ...state, isTweetWindowOpen: true }),
  CLOSE_TWEET_WINDOW: state => ({ ...state, isTweetWindowOpen: false }),
}, defaultState);

