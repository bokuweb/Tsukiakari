import { handleActions } from 'redux-actions';

const defaultState = {

};

export default handleActions({
  POST_TWEET_SUCCESS: (state, action) => ({
    ...state,
    id: action.payload.id_str,
    type: 'postTweet',
  }),
}, defaultState);

