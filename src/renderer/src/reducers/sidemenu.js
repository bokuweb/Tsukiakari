import { handleActions } from 'redux-actions';

const defaultState = {
  isAddColumnMenuOpen: false,
  isTweetWindowOpen: false,
  isSideMenuOpen: true,
};

export default handleActions({
  OPEN_ADD_COLUMN_MENU: (state: State): State => (
    { ...state, isAddColumnMenuOpen: true }
  ),
  CLOSE_ADD_COLUMN_MENU: (state: State): State => (
    { ...state, isAddColumnMenuOpen: false }
  ),
  OPEN_TWEET_WINDOW: (state: State): State => (
    { ...state, isTweetWindowOpen: true }
  ),
  CLOSE_TWEET_WINDOW: (state: State): State => ({
    ...state,
    isTweetWindowOpen: false,
  }),
  OPEN_SIDEMENU: (state: State): State => ({
    ...state, isSideMenuOpen: true,
  }),
  CLOSE_SIDEMENU: (state: State): State => ({
    ...state,
    isSideMenuOpen: false,
  }),
  REPLY: (state: State): State => ({
    ...state,
    isTweetWindowOpen: true,
  }),
}, defaultState);

