import React from 'react';
import PropTypes from 'prop-types';
import { Layouts } from '@sloops/library-ui-components';

const Dashboard = ({ history }) => (
  <Layouts.AdminDashboardLayout history={history} activeOption="dashboard">
    <h2>Dashboard - Admin</h2>
  </Layouts.AdminDashboardLayout>
);

Dashboard.propTypes = {
  history: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default Dashboard;
