import Twitter from '../lib/twitter-client';
import { createAction } from 'redux-actions';

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
    return setInterval(() => fetch(store, account, type), 60 * 1000);
  },
};

export default store => next => action => {
  const hook = hooks[action.type];
  if (hook) {
    const timerId = hook(store, action);
    return next(Object.assign({}, action, { timerId }));
  }
  return next(action);
};
