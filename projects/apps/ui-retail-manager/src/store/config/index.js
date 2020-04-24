import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createBatchingNetworkInterface, ApolloClient } from 'react-apollo';
import thunk from 'redux-thunk';
import { reducer as formReducer } from 'redux-form';
import rootReducer from '../reducers';

const configureReduxStoreAndApolloClient = (initialState = {}) => {
  const apiUrl = API_URL; // eslint-disable-line no-undef
  const appId = APP_ID; // eslint-disable-line no-undef

  const networkInterface = createBatchingNetworkInterface({
    uri: apiUrl,
    batchInterval: 10,
    batchMax: 10,
  });

  const apolloClient = new ApolloClient({
    networkInterface,
    queryDeduplication: true,
    reduxRootSelector: state => state.api,
  });

  const reduxStore = createStore(
    combineReducers({
      ui: rootReducer,
      api: apolloClient.reducer(),
      form: formReducer,
    }),
    initialState,
    composeWithDevTools(applyMiddleware(
      thunk,
      apolloClient.middleware(),
    )),
  );

  networkInterface.use([{
    applyBatchMiddleware(req, next) {
      if (!req.options.headers) {
        req.options.headers = {};
      }
      const state = reduxStore.getState();
      req.options.headers.authorization = state.ui.localStorage.storage.token;
      req.options.headers.appid = appId;
      next();
    },
  }]);

  if (module.hot) {
    module.hot.accept('../reducers', () => {
      const nextReducer = require('../reducers').default; // eslint-disable-line global-require

      reduxStore.replaceReducer(nextReducer);
    });
  }

  return {
    reduxStore,
    apolloClient,
  };
};

export default configureReduxStoreAndApolloClient;
