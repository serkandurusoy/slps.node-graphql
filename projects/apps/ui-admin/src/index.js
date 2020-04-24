import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { ApolloProvider } from 'react-apollo';
import configureReduxStoreAndApolloClient from './store/config';
import App from './app';
import './index.sass';

const preloadedState = window.SLOOPS_PRELOADED_STATE
  || JSON.parse(window.localStorage.getItem('SLOOPS_PRELOADED_STATE'))
  || {};
delete window.SLOOPS_PRELOADED_STATE;
window.localStorage.removeItem('SLOOPS_PRELOADED_STATE');

const {
  reduxStore,
  apolloClient,
} = configureReduxStoreAndApolloClient(preloadedState);

const render = (Component, mountPoint) => {
  ReactDOM.render(
    <AppContainer>
      <ApolloProvider store={reduxStore} client={apolloClient}>
        <Component />
      </ApolloProvider>
    </AppContainer>,
    mountPoint,
  );
};

const mountPoint = document.getElementById('app_root');

render(App, mountPoint);

if (module.hot) {
  module.hot.accept('./app', () => {
    const AppNext = require('./app').default; // eslint-disable-line global-require
    render(AppNext, mountPoint);
  });
}
