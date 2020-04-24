import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom';
import { accountsApi } from '@sloops/library-ui-data-wrappers';
import { Layouts, TabNav } from '@sloops/library-ui-components';
import { setViewType } from '../../store/actions';
import { UserProfilePage } from '../user-profile';
import {
  TeamAdminManagers,
  TeamAdminRepresentatives,
  TeamManager,
} from './';


const TeamComponent = ({
  history,
  location,
  match,
  me,
  viewType,
  setViewTypeDispatch, // eslint-disable-line no-shadow
}) => {
  const submenuItems = [
    ...(viewType === 'manager' ? [
      {
        label: 'Your Sales Team',
        onClick: () => history.push(match.url),
        active: location.pathname === match.url,
      },
    ] : []),
    ...(viewType === 'admin' ? [
      {
        label: 'Managers',
        onClick: () => history.push(`${match.url}/managers`),
        active: location.pathname === `${match.url}/managers`,
      },
      {
        label: 'Representatives',
        onClick: () => history.push(`${match.url}/representatives`),
        active: location.pathname === `${match.url}/representatives`,
      },
    ] : []),
  ];
  return (
    <Layouts.SalesDashboardLayout
      history={history}
      location={location}
      activeOption="team"
      activeSuboption={location.pathname}
      isAdministrator={me.me.isAdministrator}
      isSalesManager={me.me.isSalesManager}
      isSalesRepresentative={me.me.isSalesRepresentative}
      viewType={viewType}
      switchView={setViewTypeDispatch}
    >
      <div>
        <TabNav items={submenuItems} />
        {
          viewType === 'manager'
            ? (
              <Switch>
                <Route
                  exact
                  path={match.url}
                  render={props => (
                    <TeamManager
                      viewType={viewType}
                      {...props}
                    />)
                  }
                />
                <Route
                  exact
                  path={`${match.url}/:userName/:userId`}
                  render={props => <UserProfilePage {...props} />}
                />
              </Switch>
            ) : null
        }
        {
          viewType === 'admin'
            ? (
              <Switch>
                <Redirect from={match.url} exact to={`${match.url}/managers`} />
                <Route path={`${match.url}/managers`} render={props => <TeamAdminManagers viewType={viewType} {...props} />} />
                <Route path={`${match.url}/representatives`} render={props => <TeamAdminRepresentatives viewType={viewType} {...props} />} />
                <Route path={`${match.url}/:userName/:userId`} render={props => <UserProfilePage {...props} />} />
              </Switch>
            ) : null
        }
      </div>
    </Layouts.SalesDashboardLayout>
  );
};

TeamComponent.propTypes = {
  history: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  location: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  match: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  me: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  viewType: PropTypes.string,
  setViewTypeDispatch: PropTypes.func,
};

TeamComponent.defaultProps = {
  viewType: '',
  setViewTypeDispatch: () => {},
};

// TODO: class just for future data integration...
class Team extends Component {
  state = {}
  render() {
    return (
      <TeamComponent {...this.props} />
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
)(Team);
