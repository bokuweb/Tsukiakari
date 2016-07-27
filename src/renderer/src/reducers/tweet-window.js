import { handleActions } from 'redux-actions';

const defaultReplyTweet = {
  user: {
    screen_name: '',
  },
};

const defaultState = {
  isPosting: false,
  isMediaUploading: false,
  replyTweet: defaultReplyTweet,
  replyAccount: {},
  media: [],
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
    media: [],
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
  UPLOAD_MEDIA: (state, action) => ({
    ...state,
    isMediaUploading: true,
  }),
  SUCCESS_UPLOAD_MEDIA: (state, action) => {
    const id = action.payload.response.media_id_string;
    const { path } = action.payload.file;
    const newMedia = [...state.media, { id, path }];
    return {
      ...state,
      media: newMedia,
      isMediaUploading: false,
    };
  },
}, defaultState);

