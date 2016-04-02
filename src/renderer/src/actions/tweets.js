import Twitter from '../lib/twitter-client';
import { createAction } from 'redux-actions';

export const fetchHome = (account, type) => dispatch => {
  const { accessToken, accessTokenSecret } = account;
  const twitter = new Twitter(accessToken, accessTokenSecret);
  twitter.fetchHomeTimeline({})
    .then(tweets => {
      const action = createAction('FETCH_TIMELINE_SUCCESS');
      dispatch(action({ account, tweets, type }));
    })
    .catch(error => {
      console.error(error);
      const action = createAction('FETCH_TIMELINE_FAIL');
      dispatch(action({ error }));
    });
};

export const fetchFavorites = (account, type) => dispatch => {
  const { accessToken, accessTokenSecret } = account;
  const twitter = new Twitter(accessToken, accessTokenSecret);
  twitter.fetchFavorites({})
    .then(tweets => {
      const action = createAction('FETCH_TIMELINE_FAVORITE_SUCCESS');
      dispatch(action({ account, tweets, type }));
    })
    .catch(error => {
      console.error(error);
      const action = createAction('FETCH_TIMELINE_FAIL');
      dispatch(action({ error }));
    });
};


