import React from 'react';
import PropTypes from 'prop-types';
import { UserProfile } from './';

const UserProfilePage = ({
  match: {
    params: {
      userId,
    },
  },
  ...rest
}) => (
  <UserProfile
    fetchProfileForUserId={userId}
    {...rest}
  />
);

UserProfilePage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.object,
    isExact: PropTypes.bool,
    path: PropTypes.string,
    url: PropTypes.string,
  }).isRequired,
};

export default UserProfilePage;
