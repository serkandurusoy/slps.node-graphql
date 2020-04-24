/* eslint-disable react/prop-types */
import React from 'react';
import RetailerDashboardLayout from '../../layouts/_retailer-dashboard-layout';

const TempOrders = ({ history }) => (
  <RetailerDashboardLayout activeOption="orders" history={history}>
    <h2>Reatail Orders</h2>
  </RetailerDashboardLayout>
);

export default TempOrders;
