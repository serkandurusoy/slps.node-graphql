/* eslint-disable react/prop-types */
import React from 'react';
import RetailerDashboardLayout from '../../layouts/_retailer-dashboard-layout';

const TempInventory = ({ history }) => (
  <RetailerDashboardLayout activeOption="inventory" history={history}>
    <h2>Reatail Inventory</h2>
  </RetailerDashboardLayout>
);

export default TempInventory;
