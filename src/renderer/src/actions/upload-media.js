/* @flow */

import { createAction } from 'redux-actions';
P
export type UploadMediaActionType = {
  type: 'DELETE_MEDIA',
  payload: { id: string },
}

export const deleteMedia = createAction('DELETE_MEDIA');
