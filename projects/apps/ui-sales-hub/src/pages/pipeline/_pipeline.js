import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Switch, Redirect, Route } from 'react-router-dom';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { accountsApi } from '@sloops/library-ui-data-wrappers';
import { Layouts } from '@sloops/library-ui-components';
import { PipelineContacts, PipelineMeetings, PipelineContactsLeadsProspectsForm } from './';
import { setViewType } from '../../store/actions';

const PipelineComponent = ({
  history,
  match,
  location,
  me,
  viewType,
  setViewTypeDispatch,
}) => (
  <Layouts.SalesDashboardLayout
    history={history}
    location={location}
    activeOption="pipeline"
    activeSuboption={location.pathname}
    isAdministrator={me.me.isAdministrator}
    isSalesManager={me.me.isSalesManager}
    isSalesRepresentative={me.me.isSalesRepresentative}
    viewType={viewType}
    switchView={setViewTypeDispatch}
    secondarySidebarComponent={location.pathname.includes('/edit') || location.pathname.includes('/add') ? <PipelineContactsLeadsProspectsForm location={location} history={history} viewType={viewType} /> : null}
  >
    <Switch>
      <Redirect from={match.url} exact to={`${match.url}/contacts`} />
      <Route path={`${match.url}/contacts`} render={props => <PipelineContacts viewType={viewType} {...props} />} />
      {viewType !== 'admin' && viewType !== 'manager' ? <Route path={`${match.url}/meetings`} component={PipelineMeetings} /> : null}
      {viewType !== 'admin' && viewType !== 'manager' ? <Route path={`${match.url}/meetings/past`} component={PipelineMeetings} /> : null}
    </Switch>
  </Layouts.SalesDashboardLayout>
);

PipelineComponent.propTypes = {
  history: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  match: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  location: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  me: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  viewType: PropTypes.string,
  setViewTypeDispatch: PropTypes.func,
};

PipelineComponent.defaultProps = {
  viewType: '',
  setViewTypeDispatch: () => {},
};

// TODO: class just for future data integration...
class Pipeline extends Component {
  state = {}
  render() {
    return (
      <PipelineComponent {...this.props} />
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
)(Pipeline);
