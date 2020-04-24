import React from 'react';
import PropTypes from 'prop-types';
import { compose, withProps } from 'recompose';
import { connect } from 'react-redux';
import Alert from 'react-s-alert';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/flip.css';
import { accountsApi } from '@sloops/library-ui-data-wrappers';
import {
  Home,
  UserList,
  TeamList,
  TeamMember,
  SendInvitations,
  AddTeamMembers,
  ErrorPage,
} from '../pages/common';
import { UserAccount } from '../pages/user-account';
import {
  Logout,
  AcceptInvitation,
  VerifyEmail,
  ForgotPassword,
  ResetPassword,
  Login,
} from '../pages/accounts';
import { Pipeline } from '../pages/pipeline';
import { Referrals } from '../pages/referrals';
import { RetailerAccounts, RetailerPreview, RetailerAccountsAdd } from '../pages/retailer-accounts';
import { Statistics } from '../pages/statistics';
import { Team } from '../pages/team';
import { Dashboard } from '../pages/dashboard';
import { Payouts } from '../pages/payouts';

const adminManagerRedirections = (me, props, path, rest) => {
  if (me.isAdministrator && (props.match.url !== `/admin${path}` && props.match.url !== path)) { // eslint-disable-line react/prop-types
    return <Redirect to={`/admin${path}`} />;
  }
  if (me.isSalesManager && (props.match.url !== `/manager${path}` && props.match.url !== path)) {
    return <Redirect to={`/manager${path}`} />;
  }
  if (!me.isAdministrator && !me.isSalesManager && props.match.url !== path) {
    return <Redirect to={path} />;
  }
  return rest;
};

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
                path="/user-list"
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
                    : me.isSalesRepresentative
                      ? <Redirect to="/dashboard" />
                      : <UserList {...props} />
                )}
              />
              <Route
                path="/team-list"
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
                    : !me.isSalesManager
                      ? <Redirect to="/dashboard" />
                      : <TeamList {...props} />
                )}
              />
              <Route
                path="/team-member/:userId"
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
                    : !me.isSalesManager
                      ? <Redirect to="/dashboard" />
                      : <TeamMember {...props} />
                )}
              />
              <Route
                path="(/admin|/manager)?/dashboard"
                exact
                render={props => adminManagerRedirections(
                  me, props, '/dashboard',
                  (
                    !me.isAllowed
                      ? <Redirect
                        to={{
                          pathname: '/login',
                          state: {
                            from: props.location.pathname, // eslint-disable-line react/prop-types
                          },
                        }}
                      />
                      : <Dashboard {...props} />
                  ),
                )}
              />
              <Route
                path="/send-invitations"
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
                    : !me.isSalesRepresentative
                      ? <SendInvitations {...props} />
                      : <Redirect to="/dashboard" />
                )}
              />
              <Route
                path="/add-team-members"
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
                    : me.isSalesManager
                      ? <AddTeamMembers {...props} />
                      : <Redirect to="/dashboard" />
                )}
              />
              <Route
                path="(/admin|/manager)?/user-account"
                render={props => adminManagerRedirections(
                  me, props, '/user-account',
                  (
                    !me.isAllowed
                      ? <Redirect
                        to={{
                          pathname: '/login',
                          state: {
                            from: props.location.pathname, // eslint-disable-line react/prop-types
                          },
                        }}
                      />
                      : <UserAccount {...props} />
                  ),
                )}
              />
              <Route
                path="/logout"
                render={props => (
                  me.isAllowed
                    ? <Logout {...props} />
                    : <Redirect to="/" />
                )}
              />
              <Route
                path="(/admin|/manager)?/pipeline"
                render={props => adminManagerRedirections(
                  me, props, '/pipeline',
                  (
                    me.isAllowed
                      ? <Pipeline {...props} />
                      : <Redirect to="/" />
                  ),
                )}
              />
              <Route
                path="(/admin|/manager)?/referrals"
                render={props => adminManagerRedirections(
                  me, props, '/referrals',
                  (
                    me.isAllowed
                      ? <Referrals {...props} />
                      : <Redirect to="/" />
                  ),
                )}
              />
              <Route
                path="/referrals/delegated"
                render={props => (
                  me.isAllowed
                    ? <Referrals {...props} />
                    : <Redirect to="/" />
                )}
              />
              <Route
                path="(/admin|/manager)?/accounts/open"
                exact
                render={props => adminManagerRedirections(
                  me, props, '/accounts/open',
                  (
                    me.isAllowed
                      ? <RetailerAccounts {...props} />
                      : <Redirect to="/" />
                  ),
                )}
              />
              <Route
                path="(/admin|/manager)?/accounts/business/:businessId/preview"
                render={props => adminManagerRedirections(me, props, `/accounts/business/${props.match.params.businessId}/preview`, // eslint-disable-line
                  (
                    me.isAllowed
                      ? <RetailerPreview {...props} />
                      : <Redirect to="/" />
                  ),
                )}
              />
              <Route
                path="(/admin|/manager)?/accounts/completed"
                exact
                render={props => adminManagerRedirections(
                  me, props, '/accounts/completed',
                  (
                    me.isAllowed
                      ? <RetailerAccounts {...props} />
                      : <Redirect to="/" />
                  ),
                )}
              />
              <Route
                path="(/admin|/manager)?/accounts/add"
                exact
                render={props => adminManagerRedirections(
                  me, props, '/accounts/add',
                  (
                    me.isAllowed
                      ? <RetailerAccountsAdd {...props} />
                      : <Redirect to="/" />
                  ),
                )}
              />
              <Route
                path="(/admin|/manager)?/statistics"
                exact
                render={props => adminManagerRedirections(
                  me, props, '/statistics',
                  (
                    me.isAllowed
                      ? <Statistics {...props} />
                      : <Redirect to="/" />
                  ),
                )}
              />
              <Route
                path="(/admin|/manager)?/team"
                render={props => adminManagerRedirections(
                  me, props, '/team',
                  (
                    !me.isAllowed
                      ? <Redirect
                        to={{
                          pathname: '/login',
                          state: {
                            from: props.location.pathname, // eslint-disable-line react/prop-types
                          },
                        }}
                      />
                      : !me.isSalesManager && !me.isAdministrator
                        ? <Redirect to="/dashboard" />
                        : <Team {...props} />
                  ),
                )}
              />
              <Route
                path="(/admin|/manager)?/payouts"
                render={props => adminManagerRedirections(
                  me, props, '/payouts',
                  (
                    !me.isAllowed
                      ? <Redirect
                        to={{
                          pathname: '/login',
                          state: {
                            from: props.location.pathname, // eslint-disable-line react/prop-types
                          },
                        }}
                      />
                      : !me.isSalesManager && !me.isAdministrator
                        ? <Redirect to="/dashboard" />
                        : <Payouts {...props} />
                  ),
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
