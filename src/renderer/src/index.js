import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './dist/stores/configure-store';
import App from './dist/containers/app';

const store = configureStore();

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('tsukiakari')
);
