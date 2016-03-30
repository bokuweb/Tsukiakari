import { createAction } from 'redux-actions';

export const openAddColumnMenu = () => (
  createAction('OPEN_ADD_COLUMN_MENU')()
);

export const closeAddColumnMenu = () => (
  createAction('CLOSE_ADD_COLUMN_MENU')()
);
