import React from 'react';
import { withRouter } from 'react-router-dom';
import { Layouts } from '@sloops/library-ui-components';
import { UserProfile } from './';

// eslint-disable-next-line react/prop-types
const TeamMember = ({ match, history, location }) => (
  <Layouts.SalesDashboardLayout history={history} location={location}>
    <h2>Team member details</h2>
    <UserProfile fetchProfileForUserId={parseInt(match.params.userId, 10)} />
  </Layouts.SalesDashboardLayout>
);

export default withRouter(TeamMember);
