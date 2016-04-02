import { handleActions } from 'redux-actions';
import { take, map } from 'lodash';
import uuid from 'uuid';
import * as config from '../constants/config';

const defaultState = {
  timeline: [],
  columns: [],
};

const iconSelector = type => {
  switch (type) {
    case 'Home': return 'lnr lnr-home';
    case 'Favorite': return 'lnr lnr-heart';
    default : return 'lnr lnr-cog';
  }
};

export default handleActions({
  FETCH_TIMELINE_SUCCESS: (state, action) => {
    const { account, tweets, type } = action.payload;

    const ids = map(take(state.timeline, config.tweetCount), 'id');
    const filteredTweets = tweets.filter(tweet => ids.indexOf(tweet.id) === -1);

    // Search account.id from columns.contents
    const columns = state.columns.map(column => {
      column.contents.forEach(content => {
        if (content.account.id === account.id && content.type === type)
          column.timeline = filteredTweets.concat(column.timeline); 
      });
      return column;
    });
    console.dir(columns);
    return { ...state, timeline: filteredTweets.concat(state.timeline), columns };
  },
  ADD_COLUMN: (state, action) => {
    const { account, type } = action.payload;
    const id = uuid.v4();
    const title = type; // TODO: If mixed columns, custom timeline
    const icon = iconSelector(type);
    return {
      ...state,
      columns: state.columns.concat([{
        id,
        title,
        icon,
        contents: [{ account, type }],
        timeline: [], // TODO: concat RAW timeline
      }]),
    };
  },
  DELETE_COLUMN: (state, action) => {
    const { id } = action.payload;
    const columns = state.columns.filter(column => column.id !== id);
    return { ...state, columns };
  },
}, defaultState);

