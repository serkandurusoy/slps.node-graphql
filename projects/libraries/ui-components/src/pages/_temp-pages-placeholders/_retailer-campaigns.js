/* eslint-disable react/prop-types */
import React from 'react';
import RetailerDashboardLayout from '../../layouts/_retailer-dashboard-layout';

const TempCampaigns = ({ history }) => (
  <RetailerDashboardLayout activeOption="campaigns" history={history}>
    <h2>Reatail Campains</h2>
  </RetailerDashboardLayout>
);

export default TempCampaigns;
