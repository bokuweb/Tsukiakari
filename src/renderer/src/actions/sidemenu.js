import { createAction } from 'redux-actions';

export const openAddColumnMenu = () => (
  createAction('OPEN_ADD_COLUMN_MENU')()
);

export const closeAddColumnMenu = () => (
  createAction('CLOSE_ADD_COLUMN_MENU')()
);

export const openTweetWindow = () => (
  createAction('OPEN_TWEET_WINDOW')()
);

export const closeTweetWindow = () => {
  console.time('close');
  return createAction('CLOSE_TWEET_WINDOW')();
};
