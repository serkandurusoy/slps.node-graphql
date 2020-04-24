import React from 'react';
import PropTypes from 'prop-types';
import { compose, withProps } from 'recompose';
import { connect } from 'react-redux';
import Alert from 'react-s-alert';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/flip.css';
import { accountsApi } from '@sloops/library-ui-data-wrappers';
import { Pages } from '@sloops/library-ui-components';
import {
  Home,
  Dashboard,
  UserList,
  SendInvitations,
  ErrorPage,
} from '../pages/common';
import { UserAccount } from '../pages/user-account';
import { Business } from '../pages/business';
import {
  Logout,
  AcceptInvitation,
  ForgotPassword,
  ResetPassword,
  VerifyEmail,
  Login,
  Register,
} from '../pages/accounts';
import { Inventory } from '../pages/inventory';

const Layout = ({ firstHit, me: { me, loading } }) => (
  <BrowserRouter>
    <div>
      {
        firstHit || loading
          ? <div>loading...</div>
          : (
            <Switch>
              <Route
                path="/"
                exact
                render={props => (
                  me.isAllowed
                    ? <Redirect to="/dashboard" />
                    : <Home {...props} />
                )}
              />
              <Route
                path="/login"
                exact
                render={props => (
                  me.isAllowed
                    ? <Redirect to="/dashboard" />
                    : <Login {...props} />
                )}
              />
              <Route
                path="/register"
                exact
                render={props => (
                  me.isAllowed
                    ? <Redirect to="/dashboard" />
                    : <Register {...props} />
                )}
              />
              <Route
                path="/forgot-password"
                exact
                render={props => (
                  me.isAllowed
                    ? <Redirect to="/dashboard" />
                    : <ForgotPassword {...props} />
                )}
              />
              <Route
                path="/reset-password/:resetToken"
                render={props => (
                  me.isAllowed
                    ? <Redirect to="/dashboard" />
                    : <ResetPassword {...props} />
                )}
              />
              <Route
                path="/accept-invitation/:pendingInvitation"
                render={props => (
                  me.isAllowed
                    ? <Redirect to="/dashboard" />
                    : <AcceptInvitation {...props} />
                )}
              />
              <Route
                path="/verify-email/:verificationToken"
                render={props => (
                  me.isAllowed
                    ? <Redirect to="/dashboard" />
                    : <VerifyEmail {...props} />
                )}
              />
              <Route
                path="/user-list"
                exact
                render={props => (
                  !me.isAllowed
                    ? <Redirect
                      to={{
                        pathname: '/login',
                        state: {
                          from: props.location.pathname, // eslint-disable-line react/prop-types
                        },
                      }}
                    />
                    : me.isRetailer
                      ? <Redirect to="/dashboard" />
                      : <UserList {...props} />
                )}
              />
              <Route
                path="/dashboard"
                exact
                render={props => (
                  me.isAllowed
                    ? (
                      me.isRetailer && !me.hasBusiness
                        ? <Redirect to="/business/edit" />
                        : <Dashboard {...props} />
                    )
                    : <Redirect
                      to={{
                        pathname: '/login',
                        state: {
                          from: props.location.pathname, // eslint-disable-line react/prop-types
                        },
                      }}
                    />
                )}
              />
              <Route
                path="/send-invitations"
                exact
                render={props => (
                  me.isAllowed
                    ? <SendInvitations {...props} />
                    : <Redirect
                      to={{
                        pathname: '/login',
                        state: {
                          from: props.location.pathname, // eslint-disable-line react/prop-types
                        },
                      }}
                    />
                )}
              />
              <Route
                path="/user-account"
                render={props => (
                  !me.isAllowed
                    ? <Redirect
                      to={{
                        pathname: '/login',
                        state: {
                          from: props.location.pathname, // eslint-disable-line react/prop-types
                        },
                      }}
                    />
                    : !me.isCoreAudience
                      ? <Redirect to="/dashboard" />
                      : <UserAccount {...props} />
                )}
              />
              <Route
                path="/logout"
                exact
                render={props => (
                  me.isAllowed
                    ? <Logout {...props} />
                    : <Redirect to="/" />
                )}
              />
              <Route
                path="/business"
                render={props => (
                  !me.isAllowed
                    ? <Redirect
                      to={{
                        pathname: '/login',
                        state: {
                          from: props.location.pathname, // eslint-disable-line react/prop-types
                        },
                      }}
                    />
                    : me.isRetailer
                      ? <Business {...props} />
                      : <Redirect to="/dashboard" />
                )}
              />
              <Route
                path="/inventory"
                render={props => (
                  !me.isAllowed
                    ? <Redirect
                      to={{
                        pathname: '/login',
                        state: {
                          from: props.location.pathname, // eslint-disable-line react/prop-types
                        },
                      }}
                    />
                    : me.isRetailer && !me.hasBusiness
                      ? <Redirect to="/business/edit" />
                      : <Inventory {...props} />
                )}
              />
              {/* TODO: just temporary placeholder pages - remove later */}
              <Route
                path="/orders"
                exact
                render={props => (
                  me.isAllowed
                    ? (
                      me.isRetailer && !me.hasBusiness
                        ? <Redirect to="/business/edit" />
                        : <Pages.TempOrders {...props} />
                    )
                    : <Redirect to="/" />
                )}
              />
              <Route
                path="/campaigns"
                exact
                render={props => (
                  me.isAllowed
                    ? (
                      me.isRetailer && !me.hasBusiness
                        ? <Redirect to="/business/edit" />
                        : <Pages.TempCampaigns {...props} />
                    )
                    : <Redirect to="/" />
                )}
              />
              <Route render={props => <ErrorPage {...props} message="404: Not Found!" />} />
            </Switch>
          )
      }
      <Alert stack={{ limit: 3 }} effect="flip" />
    </div>
  </BrowserRouter>
);

Layout.propTypes = {
  me: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  firstHit: PropTypes.bool.isRequired,
};

export default compose(
  connect(
    ({
      ui: {
        account: {
          id,
          firstHit,
        },
      },
    }) => ({
      userId: id,
      firstHit,
    }),
    null,
  ),
  withProps(() => ({ appId: APP_ID })), // eslint-disable-line no-undef
  accountsApi.query.me,
)(Layout);
