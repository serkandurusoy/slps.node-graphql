import React from 'react';
import PropTypes from 'prop-types';
import NavigationBar from '../navigation-bar';

const ErrorPageLayout = ({
  message,
  history,
  rightButton,
}) => (
  <div className="dashboard error-page">
    <div className="error-page-spider-left" />
    <div className="error-page-spider-main" />
    <div className="error-page-spider-right" />
    <div className="dashboard-top-nav-wrap">
      <NavigationBar
        logoOnClick={() => { history.push('/'); }}
        rightButton={rightButton}
      />
    </div>
    <div className="dashboard-content-wrap">
      <div className="dashboard-content">
        <div className="error-page-message">
          {message}
        </div>
      </div>
    </div>
    <div className="dashboard-footer">
      <div className="dashboard-footer-menu">
        <ul>
          <li>
            <a href="">Home</a>
          </li>
          <li>
            <a href="">Contact</a>
          </li>
          <li>
            <a href="">Legal Disclaimer</a>
          </li>
          <li>
            <a href="">Privacy Policy</a>
          </li>
        </ul>
      </div>
      <div className="dashboard-footer-bg-curve">
        <svg xmlns="http://www.w3.org/2000/svg" width="2000" height="568" viewBox="0 0 2000 568">
          <path d="M2000 0v572.715H0v-69.097C839.716 471.725 1506.383 303.852 2000 0z" fill="#FFF" fillRule="evenodd" />
        </svg>
      </div>
    </div>
  </div>
);

ErrorPageLayout.propTypes = {
  message: PropTypes.string.isRequired,
  history: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  rightButton: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default ErrorPageLayout;
