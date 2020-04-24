import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Layouts } from '@sloops/library-ui-components';
import { AccountSettings, PasswordReset } from './';

// TODO: we probably need nicer logic for activeSuboption and maybe some generic approach, we can
// pass location and check by whole 'pathname' string in layouts
const UserAccount = ({ match, location, history }) => (
  <Layouts.RetailerDashboardLayout
    history={history}
    activeOption="user-account"
    activeSuboption={location.pathname.replace(`${match.url}/`, '')}
    background="map"
  >
    <div className="user-account-wrapper">
      <Switch>
        <Redirect
          from={match.url}
          exact
          to={`${match.url}/account-settings`}
        />
        <Route
          path={`${match.url}/account-settings`}
          component={AccountSettings}
        />
        <Route
          path={`${match.url}/password-reset`}
          component={PasswordReset}
        />
      </Switch>
    </div>
  </Layouts.RetailerDashboardLayout>
);

UserAccount.propTypes = {
  match: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  history: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  location: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default UserAccount;
