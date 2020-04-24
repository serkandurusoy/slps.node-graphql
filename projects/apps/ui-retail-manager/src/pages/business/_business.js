import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Layouts } from '@sloops/library-ui-components';
import {
  BusinessDetails,
  EditBusiness,
} from './index';

const Business = ({ match, history, location }) => (
  <Layouts.RetailerDashboardLayout
    history={history}
    activeOption="business"
    activeSuboption={location.pathname.replace(`${match.url}/`, '')}
  >
    <Switch>
      <Redirect from={match.url} exact to={`${match.url}/details`} />
      <Route path={`${match.url}/details`} exact component={BusinessDetails} />
      <Route path={`${match.url}/edit`} exact component={EditBusiness} />
    </Switch>
  </Layouts.RetailerDashboardLayout>
);

Business.propTypes = {
  match: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  history: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  location: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default Business;
