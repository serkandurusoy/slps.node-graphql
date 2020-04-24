/* eslint-disable react/prop-types */
import React from 'react';
import AdminDashboardLayout from '../../layouts/_admin-dashboard-layout';

const TempAdminTeam = ({ history }) => (
  <AdminDashboardLayout activeOption="admin" activeSuboption="team" history={history}>
    Admin Team Page
  </AdminDashboardLayout>
);

export default TempAdminTeam;
