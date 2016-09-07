/* @flow */
import type { State } from 'redux';
import type { AddColumnActions } from '../actions/add-column-menu';
import { normalize, Schema, arrayOf } from 'normalizr';

const tweet = new Schema('tweets', { idAttribute: 'id_str' });

import { handleActions } from 'redux-actions';

const defaultState = {
  searchedTweets: {
    result: [],
    entities: {
      tweets: {},
    },
  },
};

export default handleActions({
  SUCCESS_SEARCH_TWEETS_FOR_MENU: (state: State, action: AddColumnActions): State => {
    if (action.type !== 'SUCCESS_SEARCH_TWEETS_FOR_MENU') return state;
    const { tweets } = action.payload;
    return { ...state, searchedTweets: normalize(tweets, arrayOf(tweet)) };
  },
}, defaultState);
