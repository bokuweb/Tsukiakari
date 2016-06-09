import { handleActions } from 'redux-actions';
import uuid from 'uuid';

const defaultState = {
  timeline: {},
  columns: [],
};

const iconSelector = {
  Home: 'lnr lnr-home',
  Favorite: 'lnr lnr-heart',
  Mention: 'fa fa-at',
};

const createNewColumns = (state, results, key) => (
  state.columns.map(column => {
    const newColumn = { ...column };
    column.contents.forEach(content => {
      if (`${content.account.id}:${content.type}` === key) {
        newColumn.results = results.map(result => ({ key, id: result }));
      }
    });
    return newColumn;
  })
);

/**
 * @param  {object}   state
 * @param  {object}   action
 * @return {object}
 */
const updateTweet = (state, action) => {
  const { account: { id }, tweet } = action.payload;
  const { timeline } = state;
  Object.keys(timeline).forEach(key => {
    if (key.indexOf(id) !== -1) {
      timeline[key].entities.tweets[tweet.id_str] = tweet;
    }
  });
  return {
    ...state,
    timeline: {
      ...timeline,
    },
  };
};

const updateTweetProperty = (accountId, tweetId, timeline, props) => {
  Object.keys(timeline).forEach(key => {
    if (key.indexOf(accountId) !== -1) {
      timeline[key].entities.tweets[tweetId] = {
        ...timeline[key].entities.tweets[tweetId],
        ...props,
      };
    }
  });
  return timeline;
};

export default handleActions({
  RECIEVE_TWEET: (state, action) => {
    // TODO: refactor
    const { account: { id }, tweet, type } = action.payload;
    const key = `${id}:${type}`;
    const timeline = state.timeline[key] || { entities: { tweets: { } } };
    let results;

    if (!(timeline.entities && timeline.entities.tweets[tweet.result])) {
      const result = [tweet.result];
      Array.prototype.push.apply(result, timeline.results);
      results = result;
    } else {
      results = timeline.results || [];
    }
    const entities = { ...timeline.entities.tweets, ...tweet.entities.tweets };
    const columns = createNewColumns(state, results, key);
    return {
      ...state,
      timeline: {
        ...state.timeline,
        [key]: {
          results,
          entities: {
            tweets: entities,
          },
        },
      },
      columns,
    };
  },
  FETCH_TIMELINE_SUCCESS: (state, action) => {
    // TODO: refactor
    const { account: { id }, tweets, type } = action.payload;
    const key = `${id}:${type}`;
    const timeline = state.timeline[key] || { entities: {} };
    const results = tweets.result
            .filter(result => !(timeline.entities && timeline.entities[result]))
            .concat(state.timeline.results || []);
    const entities = { ...timeline.entities, ...tweets.entities };
    const columns = createNewColumns(state, results, key);
    return { ...state, timeline: { ...state.timeline, [key]: { results, entities } }, columns };
  },
  CREATE_FAVORITE_REQUEST: (state, action) => {
    const { account: { id }, tweet } = action.payload;
    const { timeline } = state;
    Object.keys(timeline).forEach(key => {
      if (key.indexOf(id) !== -1) {
        timeline[key].entities.tweets[tweet.id_str] = {
          ...timeline[key].entities.tweets[tweet.id_str],
          favorited: true,
        };
      }
    });
    return {
      ...state,
      timeline: {
        ...timeline,
      },
    };
  },
  CREATE_FAVORITE_SUCCESS: updateTweet,
  DESTROY_FAVORITE_REQUEST: (state, action) => {
    const { account: { id }, tweet } = action.payload;
    const { timeline } = state;
    Object.keys(timeline).forEach(key => {
      if (key.indexOf(id) !== -1) {
        timeline[key].entities.tweets[tweet.id_str] = {
          ...timeline[key].entities.tweets[tweet.id_str],
          favorited: false,
        };
      }
    });
    return {
      ...state,
      timeline: {
        ...timeline,
      },
    };
  },
  DESTROY_FAVORITE_SUCCESS: updateTweet,
  CREATE_RETWEET_REQUEST: (state, action) => {
    const { account: { id }, tweet } = action.payload;
    const { timeline } = state;
    Object.keys(timeline).forEach(key => {
      if (key.indexOf(id) !== -1) {
        timeline[key].entities.tweets[tweet.id_str] = {
          ...timeline[key].entities.tweets[tweet.id_str],
          retweeted: true,
        };
      }
    });
    return {
      ...state,
      timeline: {
        ...timeline,
      },
    };
  },
  CREATE_RETWEET_SUCCESS: updateTweet,
  REQUEST_DESTROY_RETWEET: (state, action) => {
    const { account: { id }, tweet } = action.payload;
    const { timeline } = state;
    Object.keys(timeline).forEach(key => {
      if (key.indexOf(id) !== -1) {
        timeline[key].entities.tweets[tweet.id_str] = {
          ...timeline[key].entities.tweets[tweet.id_str],
          retweeted: false,
        };
      }
    });
    return {
      ...state,
      timeline: {
        ...timeline,
      },
    };
  },
  ADD_COLUMN: (state, action) => {
    const { account, type } = action.payload;
    const id = uuid.v4();
    const title = type; // TODO: If mixed columns, custom timeline
    const icon = iconSelector[type];
    const key = `${account.id}:${type}`;

    const timeline = state.timeline[key] || { results: [] }; // TODO: implement mixed timeline
    const { columns } = state;
    Array.prototype.push.apply(columns, [{
      id,
      title,
      icon,
      contents: [{ account, type }],
      results: timeline.results,
    }]);
    return {
      ...state,
      columns: [...columns],
    };
  },
  DELETE_COLUMN: (state, action) => {
    const { id } = action.payload;
    const columns = state.columns.filter(column => column.id !== id);
    return {
      ...state,
      columns,
    };
  },
}, defaultState);

