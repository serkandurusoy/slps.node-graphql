import React from 'react';
import PropTypes from 'prop-types';

const UserProfileMetaData = ({ user }) => (
  <div className="owner-details clearfix">
    <div className="margin-top-30 clearfix">
      <div className="owner-details-column">
        <div className="owner-details-label">Full Name</div>
        <div className="owner-details-value">
          {`${user.firstName} ${user.lastName} (${user.id})`}
        </div>
      </div>
      {
        user.activatedAt &&
        <div className="owner-details-column">
          <div className="owner-details-label">Active since:</div>
          <div className="owner-details-value">{new Date(user.activatedAt).toLocaleString()}
          </div>
        </div>
      }
      <div className="owner-details-column">
        <div className="owner-details-label">Status</div>
        <div className="owner-details-value">{user.activatedAt ? 'Active' : 'Pending'}</div>
      </div>
    </div>
    <div className="margin-top-30 clearfix">
      <div className="owner-details-column">
        <div className="owner-details-label">Email Address</div>
        <div className="owner-details-value">{user.email}</div>
      </div>
      {
        user.profile.phoneNumbers &&
        <div className="owner-details-column">
          <div className="owner-details-label">Phone Number</div>
          <div className="owner-details-value">{user.profile.phoneNumbers[0]}</div>
        </div>
      }
    </div>
    {user.profile.address &&
    <div className="margin-top-30 clearfix">
      <div className="owner-details-column">
        <div className="owner-details-label">Address</div>
        <div className="owner-details-value">{
           `${user.profile.address.area} ${user.profile.address.number}
              ${user.profile.address.zip} ${user.profile.address.state}`
         }
        </div>
      </div>
    </div>
    }
  </div>
);

UserProfileMetaData.propTypes = {
  user: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    id: PropTypes.number,
    email: PropTypes.string,
    activatedAt: PropTypes.string,
    profile: PropTypes.object,
  }).isRequired,
};
export default UserProfileMetaData;
