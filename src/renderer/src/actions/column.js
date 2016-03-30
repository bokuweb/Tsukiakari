import { createAction } from 'redux-actions';

export const addColumn = (id, type) => (
  createAction('ADD_COLUMN')({ id, type })
);

