import { handleActions } from 'redux-actions';
import uuid from 'uuid';

const defaultState = {
  timeline: {},
  timerIds: {},
  columns: [],
};

const iconSelector = {
  Home: 'lnr lnr-home',
  Favorite: 'lnr lnr-heart',
  Mention: 'fa fa-at',
};

const createNewColumns = (state, results, key) => {
  return state.columns.map(column => {
    const newColumn = { ...column };
    column.contents.forEach(content => {
      if (`${content.account.id}:${content.type}` === key) {
        newColumn.results = results.map(result => ({ key, id: result }));
      }
    });
    return newColumn;
  });
};

export default handleActions({
  RECIEVE_TWEET: (state, action) => {
    return state;
  },
  FETCH_TIMELINE_SUCCESS: (state, action) => {
    // TODO: refactor
    const { account: { id }, tweets, type } = action.payload;
    const key = `${id}:${type}`;
    const timeline = state.timeline[key] || [];
    const results = tweets.result
            .filter(result => !(timeline.entities && timeline.entities[result]))
            .concat(state.timeline.results);
    const entities = { ...timeline.entities, ...tweets.entities };
    const columns = createNewColumns(state, results, key);
    return { ...state, timeline: { ...state.timeline, [key]: { results, entities } }, columns };
  },
  CREATE_FAVORITE_REQUEST: (state, action) => {

  },
  ADD_COLUMN: (state, action) => {
    const { account, type, timerId } = action.payload;
    const id = uuid.v4();
    const title = type; // TODO: If mixed columns, custom timeline
    const icon = iconSelector[type];
    const key = `${account.id}:${type}`;
    const { timerIds } = state;
    if (timerIds[key]) {
      // FIXME: Refactor!!!!!!
      timerIds[key].count += 1;
    } else {
      timerIds[key] = {
        id: timerId,
        count: 1,
      };
    }

    const timeline = state.timeline[key] || { results: [] }; // TODO: implement mixed timeline
    return {
      ...state,
      columns: state.columns.concat([{
        id,
        timerId,
        title,
        icon,
        contents: [{ account, type }],
        results: timeline.results,
      }]),
    };
  },
  DELETE_COLUMN: (state, action) => {
    const { id } = action.payload;
    const columns = state.columns.filter(column => column.id !== id);
    return { ...state, columns };
  },
}, defaultState);

