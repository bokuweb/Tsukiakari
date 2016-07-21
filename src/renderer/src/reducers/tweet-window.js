import { handleActions } from 'redux-actions';

const defaultState = {
  isPosting: false,
};

export default handleActions({
  POST_TWEET_REQUEST: state => ({
    ...state,
    isPosting: true,
  }),
  POST_TWEET_SUCCESS: state => ({
    ...state,
    isPosting: false,
  }),
  POST_TWEET_FAIL: state => ({
    ...state,
    isPosting: false,
  }),
}, defaultState);

