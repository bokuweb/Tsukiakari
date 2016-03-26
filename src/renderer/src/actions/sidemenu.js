import { createAction } from 'redux-actions';

export const openAddColumnMenu = () => dispatch => {
  const action = createAction('OPEN_ADD_COLUMN_MENU');
  dispatch(action());
};

export const closeAddColumnMenu = () => dispatch => {
  const action = createAction('CLOSE_ADD_COLUMN_MENU');
  dispatch(action());
};
