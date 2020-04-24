import React from 'react';
import PropTypes from 'prop-types';
import { compose, withProps } from 'recompose';
import { connect } from 'react-redux';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Alert from 'react-s-alert';
import { accountsApi } from '@sloops/library-ui-data-wrappers';
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/flip.css';
import {
  Dashboard,
  SendInvitations,
  ErrorPage,
} from '../pages/common';
import { UserAccount } from '../pages/user-account';
import {
  Logout,
  Login,
  AcceptInvitation,
  VerifyEmail,
  ForgotPassword,
  ResetPassword,
} from '../pages/accounts';
import { AdminTeam } from '../pages/admin';

const Layout = ({ firstHit, me: { me, loading } }) => (
  <BrowserRouter>
    <div>
      {
        firstHit || loading
          ? <div>loading...</div>
          : (
            <Switch>
              <Redirect from="/" exact to="/dashboard" />
              <Route
                path="/login"
                exact
                render={props => (
                  me.isAllowed
                    ? <Redirect to="/dashboard" />
                    : <Login noRegisterButton {...props} />
                )}
              />
              <Route
                path="/forgot-password"
                exact
                render={props => (
                  me.isAllowed
                    ? <Redirect to="/dashboard" />
                    : <ForgotPassword noRegisterButton {...props} />
                )}
              />
              <Route
                path="/reset-password/:resetToken"
                render={props => (
                  me.isAllowed
                    ? <Redirect to="/dashboard" />
                    : <ResetPassword noRegisterButton {...props} />
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
                path="/dashboard"
                exact
                render={props => (
                  me.isAllowed
                    ? <Dashboard {...props} />
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
                path="/team"
                exact
                render={props => (
                  me.isAllowed
                    ? <AdminTeam {...props} />
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
