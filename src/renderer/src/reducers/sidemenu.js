import { handleActions } from 'redux-actions';

const defaultState = {
  isAddColumnMenuOpen: false,
};

export default handleActions({
  OPEN_ADD_COLUMN_MENU: () => ({ isAddColumnMenuOpen: true }),
  CLOSE_ADD_COLUMN_MENU: () => ({ isAddColumnMenuOpen: false }),
}, defaultState);

