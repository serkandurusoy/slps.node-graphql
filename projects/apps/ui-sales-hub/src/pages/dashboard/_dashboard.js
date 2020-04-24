import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { accountsApi } from '@sloops/library-ui-data-wrappers';
import { Layouts } from '@sloops/library-ui-components';
import { DashboardAdminManager, DashboardRepresentative } from './';
import { setViewType } from '../../store/actions';

const Dashboard = ({
  history,
  location,
  me,
  viewType,
  setViewTypeDispatch,
}) => {
  const handleSeeMoreRedirect = () => {
    history.push('/statistics');
  };
  const handleGoToPayouts = () => {
    history.push(`/${viewType}/payouts`);
  };
  return (
    <Layouts.SalesDashboardLayout
      history={history}
      location={location}
      isAdministrator={me.me.isAdministrator}
      isSalesManager={me.me.isSalesManager}
      isSalesRepresentative={me.me.isSalesRepresentative}
      activeOption="dashboard"
      viewType={viewType}
      switchView={setViewTypeDispatch}
    >
      {viewType === 'admin' || viewType === 'manager'
        ? <DashboardAdminManager
          handleGoToPayouts={handleGoToPayouts}
          viewType={viewType}
          history={history}
        />
        : <DashboardRepresentative handleSeeMoreRedirect={handleSeeMoreRedirect} />}
    </Layouts.SalesDashboardLayout>
  );
};

Dashboard.propTypes = {
  me: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  history: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  location: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  viewType: PropTypes.string,
  setViewTypeDispatch: PropTypes.func,
};

Dashboard.defaultProps = {
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
)(Dashboard);
