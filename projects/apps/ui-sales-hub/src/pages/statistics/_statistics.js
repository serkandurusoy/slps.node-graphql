import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { accountsApi } from '@sloops/library-ui-data-wrappers';
import { Layouts, Forms } from '@sloops/library-ui-components';
import { setViewType } from '../../store/actions';

// TODO: just mocked data

const statisticsSortSelectOptions = [
  {
    label: 'This month',
    value: 'this-month',
  },
  {
    label: 'Last 90 days',
    value: 'last-90-days',
  },
  {
    label: 'Last year',
    value: 'last-year',
  },
];

const autocompleteOptions = [
  { label: 'Test 1', value: 'test-1' },
  { label: 'Test 2', value: 'test-2' },
  { label: 'Test 3', value: 'test-3' },
];

const StatisticsComponent = ({
  history,
  location,
  me,
  viewType,
  setViewTypeDispatch,
}) => (
  <Layouts.SalesDashboardLayout
    history={history}
    location={location}
    activeOption="statistics"
    activeSuboption={location.pathname}
    isAdministrator={me.me.isAdministrator}
    isSalesManager={me.me.isSalesManager}
    isSalesRepresentative={me.me.isSalesRepresentative}
    viewType={viewType}
    switchView={setViewTypeDispatch}
  >
    <div className="sales-hub-statistics">
      <div className="statistics-tools">
        <div className="statistics-sort">
          <span className="statistics-sort-label">Statistics</span>
        </div>
        <div className="statistics-info-badge">
          <span>Total available payout</span>
          <span className="statistics-badge-amount">
            212.398 €
          </span>
        </div>
      </div>
      <div className="statistics-sort-select-wrapper">
        {viewType !== 'representative' ?
          <Forms.SelectFieldInput
            autoComplete
            options={autocompleteOptions}
            placeholder="Filter by team member"
            className="statistics-filter-by-team"
          /> : null}
        <Forms.SelectFieldInput className="statistics-sort-select" minimal options={statisticsSortSelectOptions} />
        <div className="statistics-sort-select-label">Filter: </div>
      </div>
      <div className="statistics-blocks-wrapper">
        <div className="statistics-item">
          <div className="statistics-item-title">
            Earnings total
          </div>
          <div className="statistics-item-element">
            <div className="statistics-item-content-label">
              Direct
            </div>
            <div className="statistics-item-content-number">
              2.000 $
            </div>
          </div>
          <div className="statistics-item-element">
            <div className="statistics-item-content-label">
              Referral
            </div>
            <div className="statistics-item-content-number">
              500 $
            </div>
          </div>
          {
            viewType === 'representative'
              ? (
                <div className="statistics-item-element">
                  <div className="statistics-item-content-label">
                    Due on 1st May
                  </div>
                  <div className="statistics-item-content-number highlighted">
                    2.500 $
                  </div>
                </div>
              ) : null
          }
        </div>
        <div className="statistics-item">
          <div className="statistics-item-title">
            Total numbers
          </div>
          <div className="statistics-item-element">
            <div className="statistics-item-content-label">
              Prospects Active
            </div>
            <div className="statistics-item-content-number">
              200
            </div>
          </div>
          <div className="statistics-item-element">
            <div className="statistics-item-content-label">
              Active Leads
            </div>
            <div className="statistics-item-content-number">
              200
            </div>
          </div>
          <div className="statistics-item-element">
            <div className="statistics-item-content-label">
              Total contacts generated
            </div>
            <div className="statistics-item-content-number">
              500
            </div>
          </div>
          <div className="statistics-item-element">
            <div className="statistics-item-content-label">
              Accounts Open
            </div>
            <div className="statistics-item-content-number">
              24
            </div>
          </div>
          <div className="statistics-item-element">
            <div className="statistics-item-content-label">
              Accounts Completed
            </div>
            <div className="statistics-item-content-number">
              24
            </div>
          </div>
        </div>
      </div>
    </div>
  </Layouts.SalesDashboardLayout>
);

StatisticsComponent.propTypes = {
  history: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  location: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  match: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  me: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  viewType: PropTypes.string,
  setViewTypeDispatch: PropTypes.func,
  availablePayout: PropTypes.string,
};

StatisticsComponent.defaultProps = {
  viewType: '',
  setViewTypeDispatch: () => {},
  availablePayout: '',
};

// TODO: class just for future data integration...
class Statistics extends Component {
  state = {}
  render() {
    return (
      <StatisticsComponent {...this.props} />
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
)(Statistics);
