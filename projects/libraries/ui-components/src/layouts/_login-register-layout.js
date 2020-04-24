import React from 'react';
import PropTypes from 'prop-types';

const LoginRegisterLayout = ({ children, navigationBar }) => (
  <div className="login-register">
    <div className="container">
      {navigationBar}
      <div className="login-register__form">
        <div className="login-register__form-inner">
          {children}
        </div>
      </div>
    </div>
    <div className="login-register__pocket-white" />
    <div className="login-register__pocket-grey" />
    <div className="container">
      <ul className="login-register__footer-menu">
        <li>
          <a>Home</a>
        </li>
        <li>
          <a>Contact</a>
        </li>
        <li>
          <a>Legal Disclaimer</a>
        </li>
        <li>
          <a>Privacy Policy</a>
        </li>
      </ul>
    </div>
  </div>
);

LoginRegisterLayout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  navigationBar: PropTypes.node,
};

LoginRegisterLayout.defaultProps = {
  navigationBar: null,
};

export default LoginRegisterLayout;
