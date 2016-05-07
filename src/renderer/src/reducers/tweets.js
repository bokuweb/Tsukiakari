import { handleActions } from 'redux-actions';
import { take, map } from 'lodash';
import uuid from 'uuid';
// import * as config from '../constants/config';

const defaultState = {
  rawTimeline: {},
  timerIds: {},
  columns: [],
  idTable: {}, // TODO: [id_str] = [{[`${id}:${type}`] : index}, [`${id}:${type}`] : index}, ....}]
};

const iconSelector = type => {
  switch (type) {
    case 'Home': return 'lnr lnr-home';
    case 'Favorite': return 'lnr lnr-heart';
    case 'Mention': return 'fa fa-at';
    default : return 'lnr lnr-cog';
  }
};

export default handleActions({
  RECIEVE_TWEET: (state, action) => {
    const { account: { id }, tweet, type } = action.payload;
    const timeline = state.rawTimeline[`${id}:${type}`] || [];
    const ids = map(timeline, 'id_str');
    const filteredTweets = ids.indexOf(tweet.id_str) === -1 ? [tweet] : [];
    console.log(filteredTweets)
    const newTimeline = filteredTweets.concat(timeline);
    const { rawTimeline } = state;
    rawTimeline[`${id}:${type}`] = newTimeline;
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
    console.timeEnd('reducer')
    return { ...state, columns };
  },
  FETCH_TIMELINE_SUCCESS: (state, action) => {
    // FIXME: refactor
    console.time('reducer')
    const { account: { id }, tweets, type } = action.payload;
    const timeline = state.rawTimeline[`${id}:${type}`] || [];
    //const ids = map(take(timeline, config.tweetCount), 'id_str');
    const ids = map(timeline, 'id_str');
    const filteredTweets = tweets.filter(tweet => ids.indexOf(tweet.id_str) === -1);
    const newTimeline = filteredTweets.concat(timeline);
    const { rawTimeline } = state;
    // rawTimeline[id] = rawTimeline[id] || {};
    rawTimeline[`${id}:${type}`] = newTimeline;
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
    console.timeEnd('reducer')
    return { ...state, columns };
  },
  ADD_COLUMN: (state, action) => {
    const { account, type, timerId } = action.payload;
    const id = uuid.v4();
    const title = type; // TODO: If mixed columns, custom timeline
    const icon = iconSelector(type);
    const { idTable } = state;
    const key = `${account.id}:${type}`;
    const { timerIds } = state;
    if (timerIds[key]) {
      // Refactor!!!!!!
      timerIds[key].count += 1;
    } else {
      timerIds[key] = {
        id: timerId,
        count: 1,
      };
    }

    const timeline = state.rawTimeline[key] || []; // TODO: implement mixed timeline
    // TODO: check perfirmance
    timeline.forEach((tweet, index) => {
      idTable[tweet.id_str] = { ...idTable[tweet.id_str], [id]: index };
    });

    // TODO: itTables作るならこのタイミング?
    return {
      ...state,
      idTable,
      columns: state.columns.concat([{
        id,
        timerId,
        title,
        icon,
        contents: [{ account, type }],
        timeline,
      }]),
    };
  },
  DELETE_COLUMN: (state, action) => {
    const { id } = action.payload;
    const columns = state.columns.filter(column => column.id !== id);
    return { ...state, columns };
  },
}, defaultState);

