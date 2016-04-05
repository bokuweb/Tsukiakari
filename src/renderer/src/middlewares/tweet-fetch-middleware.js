import Twitter from '../lib/twitter-client';
import { createAction } from 'redux-actions';

const interval = {
  Home: 60 * 1000,
  Favorite: 60 * 1000,
};

const fetch = (store, account, type) => {
  const { accessToken, accessTokenSecret } = account;
  const twitter = new Twitter(accessToken, accessTokenSecret);
  twitter.fetchHomeTimeline({ count: 200 })
    .then(tweets => {
      const action = createAction('FETCH_TIMELINE_SUCCESS');
      store.dispatch(action({ account, tweets, type }));
    })
    .catch(error => {
      const action = createAction('FETCH_TIMELINE_FAIL');
      store.dispatch(action({ error }));
    });
};

const hooks = {
  ['ADD_COLUMN'](store, { payload: { account, type } }) {
    fetch(store, account, type);
    return setInterval(() => fetch(store, account, type), interval(type));
  },
  ['DELETE_COLUMN'](store, { payload: { timerId } }) {
    clearInterval(timerId);
  },
};

export default store => next => action => {
  const hook = hooks[action.type];
  if (hook) {
    const timerId = hook(store, action);
    const newAction = Object.assign({}, action);
    newAction.payload.timerId = timerId;
    return next(newAction);
  }
  return next(action);
};
