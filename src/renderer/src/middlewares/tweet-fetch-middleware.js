import Twitter from '../lib/twitter-client';
import { createAction } from 'redux-actions';

const interval = {
  Home: 60 * 1000,
  Favorite: 60 * 1000,
  Mention: 60 * 1000,
};

const fetch = (store, account, type) => {
  const { accessToken, accessTokenSecret } = account;
  const twitter = new Twitter(accessToken, accessTokenSecret);
  twitter.fetch(type, { count: 200 })
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
    // FIXME: storeから同一のaccount, typeがないか検索し、あったらtimerIdを返す
    //const { tweets: { timerIds } } = store.getState();
    const key = `${account.id}:${type}`;
    //if (timerIds[key]) return timerIds[key].id;
    fetch(store, account, type);
    //return setInterval(() => fetch(store, account, type), interval[type]);
  },
  ['DELETE_COLUMN'](store, { payload: { timerId } }) {
    // TODO: clearするかどうかはtimerの参照カウンタで管理する必要あり？
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
