/* eslint-disable react/prop-types */
import React from 'react';
import AdminDashboardLayout from '../../layouts/_admin-dashboard-layout';

const TempAdmin = ({ history }) => (
  <AdminDashboardLayout activeOption="admin" history={history}>
    Admin Page
  </AdminDashboardLayout>
);

export default TempAdmin;
