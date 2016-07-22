import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './stores/configure-store';
import App from './containers/app';

const store = configureStore();

document.ondragover = document.ondrop = e => {
  e.preventDefault();
  return false;
};

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('tsukiakari')
);
