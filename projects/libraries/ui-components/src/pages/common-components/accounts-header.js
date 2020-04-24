import React from 'react';
import PropTypes from 'prop-types';
import NavigationBar from '../../navigation-bar';

const AccountsHeader = ({ history, noRegisterButton }) => {
  const logoOnClick = () => {
    history.push('/');
  };
  const leftButton = {
    label: 'Register',
    onClick: () => history.push('/register'),
  };
  const rightButton = {
    label: 'Login',
    onClick: () => history.push('/login'),
  };
  return (
    <NavigationBar
      transparent
      logoOnClick={logoOnClick}
      leftButton={noRegisterButton ? null : leftButton}
      rightButton={rightButton}
    />
  );
};

AccountsHeader.propTypes = {
  history: PropTypes.object, // eslint-disable-line
  noRegisterButton: PropTypes.bool,
};

AccountsHeader.defaultProps = {
  history: {},
  noRegisterButton: false,
};

export default AccountsHeader;
