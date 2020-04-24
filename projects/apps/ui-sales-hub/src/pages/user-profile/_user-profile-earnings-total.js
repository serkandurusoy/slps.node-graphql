import React from 'react';
import PropTypes from 'prop-types';

const UserProfileEarningsTotal = ({ earnings }) => (
  <div className="statistics-item">
    <div className="statistics-item-title">
      Earnings total
    </div>
    <div className="statistics-item-element">
      <div className="statistics-item-content-label">
        Direct
      </div>
      <div className="statistics-item-content-number">
        {earnings.direct} $
      </div>
    </div>
    <div className="statistics-item-element">
      <div className="statistics-item-content-label">
        Referral
      </div>
      <div className="statistics-item-content-number">
        {earnings.referral} $
      </div>
    </div>
    <div className="statistics-item-element">
      <div className="statistics-item-content-label">
        Due on {earnings.dueDate}
      </div>
      <div className="statistics-item-content-number highlighted">
        {earnings.direct + earnings.referral} $
      </div>
    </div>
  </div>
);

UserProfileEarningsTotal.propTypes = {
  earnings: PropTypes.shape({
    direct: PropTypes.number,
    referral: PropTypes.number,
    dueDate: PropTypes.string,
  }).isRequired,
};

export default UserProfileEarningsTotal;
