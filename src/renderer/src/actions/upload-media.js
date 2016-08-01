/* @flow */

import { createAction } from 'redux-actions';

export type ActionType = {
  type: 'DELETE_MEDIA',
  payload: { id: string },
}

export const deleteMedia = createAction('DELETE_MEDIA');
