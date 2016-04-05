import { createStore, applyMiddleware } from 'redux';
import reducers from '../reducers';
import fetchtweets from '../middlewares/tweet-fetch-middleware';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';

export default function configureStore() {
  const logger = createLogger();
  const createStoreWithMiddleware = applyMiddleware(
    fetchtweets,
    thunk,
    logger
  )(createStore);
  return createStoreWithMiddleware(reducers);
}
