import Twitter from '../lib/twitter-client';
import { createAction } from 'redux-actions';

export const fetchHomeTimeline = account => {
  return dispatch => {
    const { accessToken, accessTokenSecret } = account;
    const twitter = new Twitter(accessToken, accessTokenSecret);
    twitter.fetchHomeTimeline({})
      .then(tweets => {
        const action = createAction('FETCH_TIMELINE');
        dispatch(action({ tweets }));
      }).catch(error => console.dir(error));
  };
};

