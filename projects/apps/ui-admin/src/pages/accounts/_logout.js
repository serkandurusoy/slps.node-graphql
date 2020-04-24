import { Component } from 'react';
import { withApollo } from 'react-apollo';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { uiApi } from '@sloops/library-ui-data-wrappers';
import { setLocalStorage } from '../../store/actions';

class Logout extends Component {
  constructor(props) {
    super(props);
    props.localStorage.dispatch.del('token'); // eslint-disable-line react/prop-types
    props.client.resetStore(); // eslint-disable-line react/prop-types
  }

  render() {
    return null;
  }
}

const crossStorageUrl = CROSS_STORAGE_URL; // eslint-disable-line no-undef
export default compose(
  withApollo,
  connect(
    () => ({
      methodsOnly: true,
      pollInterval: 0,
    }),
    {
      syncToStore: setLocalStorage,
    },
  ),
  uiApi.mutation.syncLocalStorage(crossStorageUrl),
)(Logout);
