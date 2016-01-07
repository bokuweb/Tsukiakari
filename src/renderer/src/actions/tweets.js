import Twitter from '../lib/twitter-client';
import * as types from '../constants/action-types';

export const fetchHomeTimeline = account => {
  return dispatch => {
    const {accessToken, accessTokenSecret} = account;
    const twitter = new Twitter(accessToken, accessTokenSecret);
    twitter.fetchHomeTimeline({})
      .then(tweets => {
        dispatch({type: types.FETCH_TIMELINE, tweets});
      });
  };
};

