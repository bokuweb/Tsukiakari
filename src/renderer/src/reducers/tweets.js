import { handleActions } from 'redux-actions';
import { take, map } from 'lodash';
import Immutable from 'immutable';
import uuid from 'uuid';
// import * as config from '../constants/config';
import { fromNow } from '../lib/formatTime';

const defaultState = {
  rawTimeline: {},
  timerIds: {},
  columns: [],
  idTable: {}, // TODO: [id_str] = [{[`${id}:${type}`] : index}, [`${id}:${type}`] : index}, ....}]
};

const iconSelector = {
  Home: 'lnr lnr-home',
  Favorite: 'lnr lnr-heart',
  Mention: 'fa fa-at',
};

export default handleActions({
  RECIEVE_TWEET: (state, action) => {
    return state;
  },
  FETCH_TIMELINE_SUCCESS: (state, action) => {
    // TODO: refactor
    const { account: { id }, tweets, type } = action.payload;
    const timeline = state.rawTimeline[`${id}:${type}`] || [];
    const results = tweets.result
            .filter(result => !(timeline.entities && timeline.entities[result]))
            .concat(state.rawTimeline.results);
    const entities = { ...timeline.entities, ...tweets.entities };

    const { rawTimeline } = state;
    rawTimeline[`${id}:${type}`] = { results, entities };

    const columns = state.columns.map(column => {
      const newColumn = { ...column };
      column.contents.forEach(content => {
        if (content.account.id === id && content.type === type) {
          newColumn.timeline = results.map(r => entities.tweets[r]);
        }
      });
      return newColumn;
    });
    return { ...state, rawTimeline, columns };
  },
  ADD_COLUMN: (state, action) => {
    const { account, type, timerId } = action.payload;
    const id = uuid.v4();
    const title = type; // TODO: If mixed columns, custom timeline
    const icon = iconSelector[type];
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

    const timeline = state.rawTimeline[key] || { results: [], entities: {}}; // TODO: implement mixed timeline
    // TODO: check perfirmance
    // timeline.forEach((tweet, index) => {
    //   idTable[tweet.id_str] = { ...idTable[tweet.id_str], [id]: index };
    // });

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

