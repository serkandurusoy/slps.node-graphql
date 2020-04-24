import React from 'react';
import PropTypes from 'prop-types';
import { Layouts } from '@sloops/library-ui-components';

const NotFound = ({ history }) => (
  <Layouts.AdminDashboardLayout history={history}>
    <h2>Not found</h2>
  </Layouts.AdminDashboardLayout>
);

NotFound.propTypes = {
  history: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default NotFound;
