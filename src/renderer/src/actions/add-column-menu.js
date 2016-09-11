/* @flow */
import { createAction } from 'redux-actions';
import type { Tweet } from '../../../types/tweet';

// type Tweets = { tweets: Array<Tweet> };

export type AddColumnActions =
  { type: 'SEARCH_TWEETS_FOR_MENU', payload: { word: string } } |
  { type: 'SUCCESS_SEARCH_TWEETS_FOR_MENU', payload: { tweets: Array<Tweet> } } |
  { type: 'FAIL_SEARCH_TWEETS_FOR_MENU', payload: { error: Object } };

export const searchTweets = createAction('SEARCH_TWEETS_FOR_MENU');

export const successSearchTweets = createAction('SUCCESS_SEARCH_TWEETS_FOR_MENU');

export const failSearchTweets = createAction('FAIL_SEARCH_TWEETS_FOR_MENU');
