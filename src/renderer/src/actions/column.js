import { createAction } from 'redux-actions';

export const addColumn = (account, type) => (
  createAction('ADD_COLUMN')({ account, type })
);

