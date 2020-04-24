import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, Redirect } from 'react-router-dom';
import { TabNav } from '@sloops/library-ui-components';
import {
  PipelineContactsLeads,
  PipelineContactsLeadsEdit,
  PipelineContactsProspects,
  PipelineContactsChurn,
  PipelineContactsProspectsAdd,
  PipelineContactsProspectsEdit,
} from './';

const PipelineContactsComponent = ({
  match, history, location, viewType,
}) => {
  const isAdminOrManager = () => (viewType === 'admin' || viewType === 'manager');
  const redirections = component =>
    (!isAdminOrManager() ? <Redirect to={`${match.url}/leads`} /> : component);
  const submenuItems = [
    ...(isAdminOrManager() ? [
      {
        label: 'Prospects Inactive',
        onClick: () => { history.push(`${match.url}/prospects-inactive`); },
        active: (location.pathname === `${match.url}/prospects-inactive`),
      },
      {
        label: 'Prospects Active',
        onClick: () => { history.push(`${match.url}/prospects-active`); },
        active: (location.pathname === `${match.url}/prospects-active`),
      },
    ] : []),
    {
      label: 'Leads',
      onClick: () => history.push(`${match.url}/leads`),
      active: (location.pathname === `${match.url}/leads`),
    },
    ...(isAdminOrManager() ? [
      {
        label: 'Churn',
        onClick: () => { history.push(`${match.url}/churn`); },
        active: (location.pathname === `${match.url}/churn`),
      },
    ] : [
      {
        label: 'Prospects',
        onClick: () => history.push(`${match.url}/prospects`),
        active: (location.pathname.includes(`${match.url}/prospects`)),
      },
    ]),
  ];
  if (!viewType) return null;
  return (
    <div>
      {!location.pathname.includes('/add') && !location.pathname.includes('/edit') ? <TabNav items={submenuItems} /> : null}
      <Switch>
        {isAdminOrManager() ? <Redirect from={match.url} exact to={`${match.url}/prospects-inactive`} /> : <Redirect from={match.url} exact to={`${match.url}/leads`} />}
        <Route path={`${match.url}/leads`} exact render={props => <PipelineContactsLeads viewType={viewType} {...props} />} />
        <Route path={`${match.url}/leads/:name/:uuid/edit`} exact render={props => <PipelineContactsLeadsEdit viewType={viewType} {...props} />} />
        <Route path={`${match.url}/prospects-inactive`} exact render={props => redirections(<PipelineContactsProspects viewType={viewType} {...props} />)} />
        <Route path={`${match.url}/prospects-inactive/:name/:uuid/edit`} exact render={props => redirections(<PipelineContactsProspectsEdit viewType={viewType} {...props} />)} />
        <Route path={`${match.url}/prospects-active`} exact render={props => redirections(<PipelineContactsProspects viewType={viewType} {...props} />)} />
        <Route path={`${match.url}/prospects-active/:name/:uuid/edit`} exact render={props => redirections(<PipelineContactsProspectsEdit viewType={viewType} {...props} />)} />
        <Route path={`${match.url}/churn`} exact render={props => redirections(<PipelineContactsChurn {...props} />)} />
        <Route path={`${match.url}/churn/:name/:uuid/edit`} exact render={props => <PipelineContactsProspectsEdit viewType={viewType} {...props} />} />
        <Route path={`${match.url}/prospects`} exact render={props => <PipelineContactsProspects viewType={viewType} {...props} />} />
        <Route path={`${match.url}/prospects/:name/:uuid/edit`} exact render={props => <PipelineContactsProspectsEdit viewType={viewType} {...props} />} />
        <Route path={`${match.url}/prospects/add`} render={props => <PipelineContactsProspectsAdd viewType={viewType} {...props} />} />
      </Switch>
    </div>
  );
};

PipelineContactsComponent.propTypes = {
  match: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  history: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  location: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  viewType: PropTypes.string.isRequired,
};

// TODO: class just for future data integration...
class PipelineContacts extends Component {
  state = {}
  render() {
    return (
      <PipelineContactsComponent {...this.props} />
    );
  }
}

export default PipelineContacts;
