import React from 'react';
import PropTypes from 'prop-types';
import { userApi } from '@sloops/library-ui-data-wrappers';
import {
  UserProfileEarningsTotal,
  UserProfileStatistics,
  UserProfileMetaData,
} from './';

const statistics = {
  prospectsActive: 200,
  leadsActive: 200,
  totalContactsGenerated: 500,
  accountsOpen: 24,
  accountsCompleted: 24,
};

const earnings = {
  direct: 2000,
  referral: 500,
  dueDate: '1st May',
};

const UserProfile = ({ userProfile }) => (userProfile.user ?
  (
    <div>
      <UserProfileMetaData user={userProfile.user} />
      <div className="sales-hub-statistics">
        <div className="statistics-tools">
          <div className="statistics-sort">
            <span className="statistics-sort-label">Statistics</span>
          </div>
        </div>
        <div className="statistics-blocks-wrapper">
          <UserProfileStatistics statistics={statistics} />
          <UserProfileEarningsTotal earnings={earnings} />
        </div>
      </div>
    </div>
  ) : <div>Loading</div>);

UserProfile.propTypes = {
  userProfile: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default userApi.query.userProfile(UserProfile);
