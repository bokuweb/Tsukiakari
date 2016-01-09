import { handleActions } from 'redux-actions';

const defaultState = {
  timeline: []
};

export default handleActions({
  FETCH_TIMELINE: (state, action) => ({tweets: action.payload.tweets})
}, defaultState);


