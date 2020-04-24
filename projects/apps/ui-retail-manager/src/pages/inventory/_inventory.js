import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';
import { Layouts } from '@sloops/library-ui-components';
import { InventoryList, InventoryAdd, InventoryBarcode } from './';

const InventoryComponent = ({
  history,
  match,
  location,
}) => (
  <Layouts.RetailerDashboardLayout
    history={history}
    activeOption="inventory"
    activeSuboption={location.pathname}
  >
    <Switch>
      <Route path={match.url} exact component={InventoryList} />
      <Route exact path={`${match.url}/add`} component={InventoryAdd} />
      <Route exact path={`${match.url}/add/barcode`} component={InventoryBarcode} />
    </Switch>
  </Layouts.RetailerDashboardLayout>
);

InventoryComponent.propTypes = {
  history: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  match: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  location: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default InventoryComponent;
