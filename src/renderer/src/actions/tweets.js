import Twitter from '../lib/twitter-client';
import { createAction } from 'redux-actions';

export const fetchHomeTimeline = account => dispatch => {
  const { accessToken, accessTokenSecret } = account;
  const twitter = new Twitter(accessToken, accessTokenSecret);
  twitter.fetchHomeTimeline({})
    .then(tweets => {
      const action = createAction('FETCH_TIMELINE_SUCCESS');
      dispatch(action({ tweets }));
    })
    .catch(error => {
      console.error(error);
      const action = createAction('FETCH_TIMELINE_FAIL');
      dispatch(action({ error }));
    });
};

