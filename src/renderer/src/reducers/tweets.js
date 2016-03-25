import { handleActions } from 'redux-actions';

const defaultState = {
  timeline: [],
};

export default handleActions({
  FETCH_TIMELINE_SUCCESS: (state, action) => ({
    timeline: action.payload.tweets.concat(state.timeline),
  }),
}, defaultState);
