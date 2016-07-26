import { handleActions } from 'redux-actions';

const defaultReplyTweet = {
  user: {
    screen_name: '',
  },
};

const defaultState = {
  isPosting: false,
  replyTweet: defaultReplyTweet,
  replyAccount: {},
};

export default handleActions({
  POST_TWEET_REQUEST: state => ({
    ...state,
    isPosting: true,
  }),
  POST_TWEET_SUCCESS: state => ({
    ...state,
    isPosting: false,
    replyTweet: defaultReplyTweet,
    replyAccount: {},
  }),
  POST_TWEET_FAIL: state => ({
    ...state,
    isPosting: false,
  }),
  CLOSE_TWEET_WINDOW: state => ({
    ...state,
    replyTweet: defaultReplyTweet,
    replyAccount: {},
  }),
  REPLY: (state, action) => ({
    ...state,
    replyTweet: action.payload.tweet,
    replyAccount: action.payload.account,
  }),
}, defaultState);

