import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './app/stores/configure-store';
import App from './app/containers/app';

const store = configureStore();

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('tsukiakari')
);
