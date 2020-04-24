import React from 'react';
import PropTypes from 'prop-types';
import { Layouts } from '@sloops/library-ui-components';

// TODO: one single approach to global loaders
// styles for such pages

const Loading = ({ history }) => (
  <Layouts.AdminDashboardLayout history={history}>
    Loading...
  </Layouts.AdminDashboardLayout>
);

Loading.propTypes = {
  history: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default Loading;
