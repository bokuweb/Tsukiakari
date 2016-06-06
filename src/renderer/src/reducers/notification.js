import { handleActions } from 'redux-actions';

const defaultState = {

};

export default handleActions({
  POST_TWEET_SUCCESS: (state, action) => ({
    ...state,
    id: action.payload.id_str,
    message: 'Tweet succeeded!',
    level: 'success',
  }),
  POST_TWEET_FAIL: (state, action) => ({
    ...state,
    id: action.payload.id_str,
    message: 'Tweet failed...',
    level: 'error',
  }),
}, defaultState);

