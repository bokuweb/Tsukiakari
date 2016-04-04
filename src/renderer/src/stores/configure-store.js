import { createStore, applyMiddleware } from 'redux';
import reducers from '../reducers';
import tweets from '../middlewares/tweets';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';

export default function configureStore() {
  const logger = createLogger();
  const createStoreWithMiddleware = applyMiddleware(
    tweets,
    thunk,
    logger
  )(createStore);
  return createStoreWithMiddleware(reducers);
}
