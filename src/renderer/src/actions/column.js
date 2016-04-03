import { createAction } from 'redux-actions';

export const addColumn = (account, type) => (
  createAction('ADD_COLUMN')({ account, type })
);

export const deleteColumn = (id) => (
  createAction('DELETE_COLUMN')({ id })
);
