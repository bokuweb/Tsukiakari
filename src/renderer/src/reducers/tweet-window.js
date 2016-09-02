import { handleActions } from 'redux-actions';
import { deleteMedia } from '../actions/upload-media';
import { loadFriends } from '../actions/tweets';
import { fromJS } from 'immutable';

import type { Media } from '../../../types/media';
import type { State } from 'redux';
import type { UploadMediaActionType } from '../actions/upload-media';
import type { TweetActionType } from '../actions/tweets';
import type { Mention } from '../../../types/mentions';

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
  mentions: fromJS([]),
};

export default handleActions({
  // INFO: see. https://github.com/facebook/flow/issues/252
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
  REPLY: (state:State, action) => ({
    ...state,
    replyTweet: action.payload.tweet,
    replyAccount: action.payload.account,
  }),
  UPLOAD_MEDIA: (state: State, action) => ({
    ...state,
    isMediaUploading: true,
  }),
  SUCCESS_UPLOAD_MEDIA: (state: State, action): State => {
    const id = action.payload.response.media_id_string;
    const { path } = action.payload.file;
    const newMedia = [...state.media, { id, path }];
    return {
      ...state,
      media: newMedia,
      isMediaUploading: false,
    };
  },

  FAIL_UPLOAD_MEDIA: (state: State, action): State => {
    return {
      ...state,
      isMediaUploading: false,
    };
  },
  [deleteMedia.toString()]: (state: State, action: UploadMediaActionType): State => {
    const id: string = action.payload.id;
    const newMedia = state.media.filter((m: Media): bool => m.id !== id);
    return {
      ...state,
      media: newMedia,
    };
  },
  [loadFriends.toString()]: (state: State, action: TweetActionType): State => {
    const { friends } = action.payload;
    const mentions = fromJS(friends.users.map((f: Object): Mention => ({
      name: f.screen_name,
      avatar: f.profile_image_url_https,
      link: `https://twitter.com/${f.screen_name}`,
    })));
    return {
      ...state,
      mentions: state.mentions.merge(mentions),
    };
  },
}, defaultState);
