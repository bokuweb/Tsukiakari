import { handleActions } from 'redux-actions';
import { take, map } from 'lodash';
import uuid from 'uuid';
import * as config from '../constants/config';

const defaultState = {
  timeline: [],
  columns: [],
};

const iconSelector = type => {
  switch (type) {
    case 'Home': return 'lnr lnr-home';
    default: return null;
  }
};

export default handleActions({
  FETCH_TIMELINE_SUCCESS: (state, action) => {
    const ids = map(take(state.timeline, config.tweetCount), 'id');
    const tweets = action.payload.tweets.filter(tweet => ids.indexOf(tweet.id) === -1);
    return { ...state, timeline: tweets.concat(state.timeline) };
  },
  ADD_COLUMN: (state, action) => {
    const { account, type } = action.payload;
    const id = uuid.v4();
    const title = type;
    const icon = iconSelector(type);
    return {
      ...state,
      columns: state.columns.concat([{ id, title, icon, contents: [{ account, type }] }]),
    };
  },
  DELETE_COLUMN: (state, action) => {
    const { id } = action.payload;
    const columns = state.columns.filter(column => column.id !== id);
    return { ...state, columns };
  },
}, defaultState);

