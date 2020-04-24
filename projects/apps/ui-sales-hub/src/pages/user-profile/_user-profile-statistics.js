import React from 'react';
import PropTypes from 'prop-types';

const UserProfileStatistics = ({ statistics }) => (
  <div className="statistics-item">
    <div className="statistics-item-title">
      Total numbers
    </div>
    <div className="statistics-item-element">
      <div className="statistics-item-content-label">
        Prospects Active
      </div>
      <div className="statistics-item-content-number">
        {statistics.prospectsActive}
      </div>
    </div>
    <div className="statistics-item-element">
      <div className="statistics-item-content-label">
        Active Leads
      </div>
      <div className="statistics-item-content-number">
        {statistics.leadsActive}
      </div>
    </div>
    <div className="statistics-item-element">
      <div className="statistics-item-content-label">
        Total contacts generated
      </div>
      <div className="statistics-item-content-number">
        {statistics.totalContactsGenerated}
      </div>
    </div>
    <div className="statistics-item-element">
      <div className="statistics-item-content-label">
        Accounts Open
      </div>
      <div className="statistics-item-content-number">
        {statistics.accountsOpen}
      </div>
    </div>
    <div className="statistics-item-element">
      <div className="statistics-item-content-label">
        Accounts Completed
      </div>
      <div className="statistics-item-content-number">
        {statistics.accountsCompleted}
      </div>
    </div>
  </div>
);

UserProfileStatistics.propTypes = {
  statistics: PropTypes.shape({
    prospectsActive: PropTypes.number,
    leadsActive: PropTypes.number,
    totalContactsGenerated: PropTypes.number,
    accountsOpen: PropTypes.number,
    accountsCompleted: PropTypes.number,
  }).isRequired,
};

export default UserProfileStatistics;
