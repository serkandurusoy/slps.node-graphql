import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, Redirect } from 'react-router-dom';
import { compose, withProps } from 'recompose';
import { connect } from 'react-redux';
import { Layouts } from '@sloops/library-ui-components';
import { accountsApi } from '@sloops/library-ui-data-wrappers';
import { setViewType } from '../../store/actions';
import { AccountSettings, PasswordReset, PayoutPreferences } from './';

// TODO: we probably need nicer logic for activeSuboption and maybe some generic approach, we can
// pass location and check by whole 'pathname' string in layouts
const UserAccount = ({
  me, match, location, history, viewType, setViewTypeDispatch,
}) => (
  <Layouts.SalesDashboardLayout
    history={history}
    location={location}
    activeOption="user-account"
    activeSuboption={location.pathname.replace(`${match.url}/`, '')}
    background="map"
    isAdministrator={me.me.isAdministrator}
    isSalesManager={me.me.isSalesManager}
    isSalesRepresentative={me.me.isSalesRepresentative}
    viewType={viewType}
    switchView={setViewTypeDispatch}
  >
    <div className="user-account-wrapper">
      <Switch>
        {
          me.loading
            ? <div>loading...</div>
            : (
              <div>
                <Redirect from={match.url} exact to={`${match.url}/account-settings`} />
                <Route path={`${match.url}/account-settings`} component={AccountSettings} />
                <Route
                  path={`${match.url}/payout-preferences`}
                  render={props => (
                    me.isSalesRepresentative && !me.userProfileAsSalesRepresentativeCreated
                      ? <Redirect to={`${match.url}/account-settings`} />
                      : <PayoutPreferences {...props} />
                  )}
                />
                <Route
                  path={`${match.url}/password-reset`}
                  render={props => (
                    me.isSalesRepresentative && !me.userProfileAsSalesRepresentativeCreated
                      ? <Redirect to={`${match.url}/account-settings`} />
                      : <PasswordReset {...props} />
                  )}
                />
              </div>
            )
        }
      </Switch>
    </div>
  </Layouts.SalesDashboardLayout>
);

UserAccount.propTypes = {
  me: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  match: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  history: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  location: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  viewType: PropTypes.string,
  setViewTypeDispatch: PropTypes.func,
};

UserAccount.defaultProps = {
  viewType: '',
  setViewTypeDispatch: () => {},
};

export default compose(
  connect(
    ({
      ui: {
        account: {
          id,
        },
      },
    }) => ({
      userId: id,
    }),
    {
      setViewTypeDispatch: setViewType,
    },
  ),
  withProps(() => ({ appId: APP_ID })), // eslint-disable-line no-undef
  accountsApi.query.me,
)(UserAccount);
