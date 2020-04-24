import React from 'react';
import PropTypes from 'prop-types';
import NavigationBar from '../navigation-bar';
import SideNavigationBar from '../side-navigation-bar';

const CustomerDashboardLayout = ({
  children, activeOption, activeSuboption, history,
}) => (
  <div className="dashboard">
    <div className="dashboard-top-nav-wrap">
      <NavigationBar
        logoOnClick={() => { history.push('/'); }}
        rightButton={{
          label: 'Logout',
          onClick: () => { history.push('/logout'); },
        }}
      />
    </div>
    <div className="dashboard-content-wrap">
      <div className="dashboard-side-nav-wrap">
        <SideNavigationBar
          options={[
            {
              label: 'Dashboard',
              onClick: () => { history.push('/dashboard'); },
              icon: 'clusters',
              active: (activeOption === 'dashboard'),
            },
            {
              label: 'User Account',
              onClick: () => { history.push('/user-account'); },
              icon: 'user',
              active: (activeOption === 'user-account'),
              subOptions: [
                {
                  label: 'Account Settings',
                  active: (activeSuboption === 'account-settings'),
                  onClick: () => { history.push('/user-account/account-settings'); },
                },
                {
                  label: 'Reset Password',
                  active: (activeSuboption === 'password-reset'),
                  onClick: () => { history.push('/user-account/password-reset'); },
                },
              ],
            },
            {
              label: 'Orders',
              onClick: () => {},
              icon: 'cart',
              active: (activeOption === 'orders'),
            },
            {
              label: 'Sloops',
              onClick: () => {},
              icon: 'package',
              active: (activeOption === 'sloops'),
            },
            {
              label: 'User Account',
              onClick: () => { history.push('/user-account'); },
              icon: 'user',
              active: (activeOption === 'user-account'),
              subOptions: [
                {
                  label: 'Account Settings',
                  active: (activeSuboption === 'account-settings'),
                  onClick: () => { history.push('/user-account/account-settings'); },
                },
                {
                  label: 'Reset Password',
                  active: (activeSuboption === 'password-reset'),
                  onClick: () => { history.push('/user-account/password-reset'); },
                },
              ],
            },
          ]}
        />
      </div>
      <div className="dashboard-content">
        {children}
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

CustomerDashboardLayout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  activeOption: PropTypes.string,
  activeSuboption: PropTypes.string,
  history: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

CustomerDashboardLayout.defaultProps = {
  activeOption: '',
  activeSuboption: '',
};

export default CustomerDashboardLayout;
