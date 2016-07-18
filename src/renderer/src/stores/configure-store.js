import { createStore, applyMiddleware } from 'redux';
import reducer from '../reducers';
import fetchtweets from '../middlewares/tweet-fetch-middleware';
import saga from '../sagas';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import createLogger from 'redux-logger';

export default function configureStore() {
  // create the saga middleware
  const sagaMiddleware = createSagaMiddleware();
  let store;
  if (process.env.NODE_ENV === 'production') {
    store = createStore(
      reducer,
      applyMiddleware(
        fetchtweets,
        sagaMiddleware,
        thunk,
      )
    );
  } else {
    const logger = createLogger();
    store = createStore(
      reducer,
      applyMiddleware(
        fetchtweets,
        sagaMiddleware,
        thunk,
        logger
      )
    );
  }
  sagaMiddleware.run(saga);
  return store;
}
