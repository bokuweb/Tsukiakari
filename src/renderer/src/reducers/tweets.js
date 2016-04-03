import { handleActions } from 'redux-actions';
import { take, map } from 'lodash';
import uuid from 'uuid';
import * as config from '../constants/config';

const defaultState = {
  rawTimeline: {},
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
    const { account: { id }, tweets, type } = action.payload;
    const ids = map(take(state.timeline, config.tweetCount), 'id');
    const filteredTweets = tweets.filter(tweet => ids.indexOf(tweet.id) === -1);

    const { rawTimeline } = state;
    const timeline = state.rawTimeline[`${id}${type}`] || [];
    const newTimeline = filteredTweets.concat(timeline);
    rawTimeline[`${id}${type}`] = newTimeline;

    // Search account.id from columns.contents
    const columns = state.columns.map(column => {
      const newColumn = Object.assign({}, column);
      column.contents.forEach(content => {
        if (content.account.id === id && content.type === type) {
          newColumn.timeline = newTimeline;
        }
      });
      return newColumn;
    });
    return { rawTimeline, columns };
  },
  ADD_COLUMN: (state, action) => {
    const { account, type } = action.payload;
    const columnId = uuid.v4();
    const title = type; // TODO: If mixed columns, custom timeline
    const icon = iconSelector(type);
    return {
      ...state,
      columns: state.columns.concat([{
        id: columnId,
        title,
        icon,
        contents: [{ account, type }],
        timeline: state.rawTimeline[`${account.id}${type}`] || [], // TODO: concat RAW timeline
      }]),
    };
  },
  DELETE_COLUMN: (state, action) => {
    const { id } = action.payload;
    const columns = state.columns.filter(column => column.id !== id);
    return { ...state, columns };
  },
}, defaultState);

