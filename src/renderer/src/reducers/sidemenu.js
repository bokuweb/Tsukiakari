import { handleActions } from 'redux-actions';

const defaultReplyTweet = {
  user: {},
};

const defaultState = {
  isAddColumnMenuOpen: false,
  isTweetWindowOpen: false,
  replyTweet: defaultReplyTweet,
  replyAccount: {},
};

export default handleActions({
  OPEN_ADD_COLUMN_MENU: state => ({ ...state, isAddColumnMenuOpen: true }),
  CLOSE_ADD_COLUMN_MENU: state => ({ ...state, isAddColumnMenuOpen: false }),
  OPEN_TWEET_WINDOW: state => ({ ...state, isTweetWindowOpen: true }),
  CLOSE_TWEET_WINDOW: state => ({ ...state, isTweetWindowOpen: false }),
  REPLY: (state, action) => ({
    ...state,
    isTweetWindowOpen: true,
    replyTweet: action.payload.tweet,
    replyAccount: action.payload.account,
  }),
  POST_TWEET_SUCCESS: state => ({
    ...state,
    replyTweet: defaultReplyTweet,
    replyAccount: {},
  }),
}, defaultState);

