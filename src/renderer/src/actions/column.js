import { createAction } from 'redux-actions';

export const addColumn = (account, type, params) => (
  createAction('ADD_COLUMN')({ account, type, params })
);

export const deleteColumn = (id, timerId) => (
  createAction('DELETE_COLUMN')({ id, timerId })
);
