import React from 'react';
import { compose } from 'recompose';
import { HttpBasicAuthPrompt } from '@sloops/library-ui-components';
import { uiApi, accountsApi } from '@sloops/library-ui-data-wrappers';
import { connect } from 'react-redux';
import { setLocalStorage } from '../store/actions';
import { Layout } from './';

const enableHttpBasicAuth = STAGING; // eslint-disable-line no-undef
const crossStorageUrl = CROSS_STORAGE_URL; // eslint-disable-line no-undef

const App = props => (
  <HttpBasicAuthPrompt
    enabled={enableHttpBasicAuth}
    {...props}
  >
    <Layout />
  </HttpBasicAuthPrompt>
);

export default compose(
  connect(
    ({
      ui: {
        localStorage: {
          storage: {
            token,
          },
        },
        account: {
          exp,
        },
      },
    }) => ({
      token,
      exp,
      methodsOnly: true,
      pollInterval: 60,
    }),
    {
      syncToStore: setLocalStorage,
    },
  ),
  uiApi.mutation.syncLocalStorage(crossStorageUrl),
  accountsApi.mutation.refreshToken,
  uiApi.mutation.httpBasicAuth,
)(App);
