import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom';
import { accountsApi } from '@sloops/library-ui-data-wrappers';
import { Layouts, TabNav } from '@sloops/library-ui-components';
import { setViewType } from '../../store/actions';
import { PayoutsPending, PayoutsPaid } from './';

// TODO: just mocked data

const PayoutsComponent = ({
  history,
  location,
  match,
  me,
  viewType,
  setViewTypeDispatch, // eslint-disable-line no-shadow
}) => {
  const submenuItems = [
    {
      label: 'Pending',
      onClick: () => history.push(`${match.url}/pending`),
      active: location.pathname === `${match.url}/pending`,
    },
    {
      label: 'Paid',
      onClick: () => history.push(`${match.url}/paid`),
      active: location.pathname === `${match.url}/paid`,
    },
  ];
  return (
    <Layouts.SalesDashboardLayout
      history={history}
      location={location}
      activeOption="payouts"
      activeSuboption={location.pathname}
      isAdministrator={me.me.isAdministrator}
      isSalesManager={me.me.isSalesManager}
      isSalesRepresentative={me.me.isSalesRepresentative}
      viewType={viewType}
      switchView={setViewTypeDispatch}
    >
      <div>
        <TabNav items={submenuItems} />
        <Switch>
          <Redirect from={match.url} exact to={`${match.url}/pending`} />
          <Route path={`${match.url}/pending`} render={props => <PayoutsPending viewType={viewType} {...props} />} />
          <Route path={`${match.url}/paid`} render={props => <PayoutsPaid viewType={viewType} {...props} />} />
        </Switch>
      </div>
    </Layouts.SalesDashboardLayout>
  );
};

PayoutsComponent.propTypes = {
  history: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  location: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  match: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  me: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  viewType: PropTypes.string,
  setViewTypeDispatch: PropTypes.func,
};

PayoutsComponent.defaultProps = {
  viewType: '',
  setViewTypeDispatch: () => {},
};

// TODO: class just for future data integration...
class Payouts extends Component {
  state = {}
  render() {
    return (
      <PayoutsComponent {...this.props} />
    );
  }
}

export default compose(
  connect(
    ({
      ui: {
        account: {
          id,
        },
        viewType,
      },
    }) => ({
      userId: id,
      viewType,
    }),
    {
      setViewTypeDispatch: setViewType,
    },
  ),
  accountsApi.query.me,
)(Payouts);
