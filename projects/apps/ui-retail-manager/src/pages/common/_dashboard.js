import React from 'react';
import PropTypes from 'prop-types';
import { Layouts } from '@sloops/library-ui-components';

const Dashboard = ({ history }) => (
  <Layouts.RetailerDashboardLayout history={history} activeOption="dashboard">
    <h2>Dashboard - Retail Manager</h2>
  </Layouts.RetailerDashboardLayout>
);

Dashboard.propTypes = {
  history: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default Dashboard;
