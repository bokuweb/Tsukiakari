import { handleActions } from 'redux-actions';

const defaultState = {
  timeline: []
};

export default handleActions({
  FETCH_TIMELINE: (state, action) => ({timeline: action.payload.tweets})
}, defaultState);


