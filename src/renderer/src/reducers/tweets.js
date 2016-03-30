import { handleActions } from 'redux-actions';
import { take, map } from 'lodash';
import * as config from '../constants/config';

const defaultState = {
  timeline: [],
  columns: [],
};

export default handleActions({
  FETCH_TIMELINE_SUCCESS: (state, action) => {
    const ids = map(take(state.timeline, config.tweetCount), 'id');
    const tweets = action.payload.tweets.filter(tweet => ids.indexOf(tweet.id) === -1);
    return { timeline: tweets.concat(state.timeline), columns: state.columns };
  },
  ADD_COLUMN: (state, action) => {
    const { id, type } = action.payload;
    return { timeline: state.timeline, columns: state.columns.concat({ id, type }) };
  },
}, defaultState);

