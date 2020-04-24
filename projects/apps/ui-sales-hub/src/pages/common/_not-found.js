import React from 'react';
import PropTypes from 'prop-types';
import { Layouts } from '@sloops/library-ui-components';

const NotFound = ({ history, location }) => (
  <Layouts.SalesDashboardLayout history={history} location={location}>
    <h2>Not found</h2>
  </Layouts.SalesDashboardLayout>
);

NotFound.propTypes = {
  history: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  location: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default NotFound;
