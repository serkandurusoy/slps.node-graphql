import React, { Component } from 'react';
import PropTypes from 'prop-types';
import NavigationBar from '../navigation-bar';
import SideNavigationBar from '../side-navigation-bar';
import { CheckboxFields } from '../forms';

// Options for sub navigation component
const getSubNavOptions = (isAdministrator, isSalesManager, isSalesRepresentative, viewType) => {
  let options = [];
  if (isAdministrator) {
    options = [
      { value: 'admin', label: 'Admin', checked: viewType === 'admin' },
      { value: 'representative', label: 'Representative', checked: viewType === '' || viewType === 'representative' },
    ];
  }
  if (isSalesManager) {
    options.push(
      { value: 'manager', label: 'Manager', checked: viewType === 'manager' },
      { value: 'representative', label: 'Representative', checked: viewType === '' || viewType === 'representative' },
    );
  }
  return options;
};

// Switching sub navigation options using buttonized checkboxes
const findInOptionsAndToggle = (value, collection) => {
  const itemIndex = collection.findIndex(item => item.value === value);
  const newArray = [...collection].map(item => ({
    label: item.label,
    value: item.value,
  }));
  newArray[itemIndex].checked = true;
  return newArray;
};

class SalesDashboardLayout extends Component {
  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
    ]).isRequired,
    activeOption: PropTypes.string,
    activeSuboption: PropTypes.string,
    history: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
    location: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
    isAdministrator: PropTypes.bool,
    isSalesManager: PropTypes.bool,
    isSalesRepresentative: PropTypes.bool,
    viewType: PropTypes.string,
    switchView: PropTypes.func,
    secondarySidebarOptions: PropTypes.array, // eslint-disable-line react/forbid-prop-types
    secondarySidebarComponent: PropTypes.node,
    background: PropTypes.string,
  }
  static defaultProps = {
    activeOption: '',
    activeSuboption: '',
    isAdministrator: false,
    isSalesManager: false,
    isSalesRepresentative: false,
    viewType: '',
    switchView: () => {},
    secondarySidebarOptions: [],
    secondarySidebarComponent: null,
    background: '',
  }
  state = {
    viewSwitchOptions: getSubNavOptions(
      this.props.isAdministrator,
      this.props.isSalesManager,
      this.props.isSalesRepresentative,
      this.props.viewType,
    ),
    secondarySidebarActiveItemIndex: 0,
  }
  componentWillReceiveProps() {
    if (this.props.location.pathname.includes('/admin')) {
      this.props.switchView('admin');
      this.setState({
        viewSwitchOptions: getSubNavOptions(
          this.props.isAdministrator,
          this.props.isSalesManager,
          this.props.isSalesRepresentative,
          'admin',
        ),
      });
    } else if (this.props.location.pathname.includes('/manager')) {
      this.props.switchView('manager');
      this.setState({
        viewSwitchOptions: getSubNavOptions(
          this.props.isAdministrator,
          this.props.isSalesManager,
          this.props.isSalesRepresentative,
          'manager',
        ),
      });
    } else {
      this.props.switchView('representative');
      this.setState({
        viewSwitchOptions: getSubNavOptions(
          this.props.isAdministrator,
          this.props.isSalesManager,
          this.props.isSalesRepresentative,
          'representative',
        ),
      });
    }
    if ((this.props.location.pathname.includes('/team') || this.props.location.pathname.includes('/payouts')) && this.props.viewType === 'representative') {
      this.props.history.push('/dashboard');
    }
  }
  handleViewSwitch = (value) => {
    let newLocation = this.props.location.pathname;
    this.setState((prevState) => {
      const newState = findInOptionsAndToggle(value, prevState.viewSwitchOptions);
      return {
        viewSwitchOptions: newState,
      };
    });
    const locationArray = newLocation.split('/');
    if ((locationArray[1] === 'admin' || locationArray[1] === 'manager') && value !== 'representative') {
      locationArray[1] = value;
      newLocation = locationArray.join('/');
    } else if (value !== 'representative') {
      newLocation = `/${value}${newLocation}`;
    } else {
      newLocation = newLocation.replace(/(\/admin|\/manager)/, '');
    }
    if ((newLocation.includes('/team') || newLocation.includes('/payouts')) && value === 'representative') {
      newLocation = '/dashboard';
    }
    this.props.switchView(value);
    this.props.history.push(newLocation);
  }
  pathPrefix = (viewType) => {
    if (viewType === 'admin') return '/admin';
    if (viewType === 'manager') return '/manager';
    return '';
  }
  subSidebarItemClick = (index, onClick) => {
    this.setState({
      secondarySidebarActiveItemIndex: index,
    });
    if (onClick) {
      onClick();
    }
  }
  layoutBgClass = () => {
    if (this.props.background === 'map') return 'with-bg-map';
    return '';
  }
  render() {
    const {
      children,
      activeOption,
      activeSuboption,
      history,
      viewType,
    } = this.props;
    return (
      <div className={`dashboard ${this.layoutBgClass()}`}>
        <div className="dashboard-top-nav-wrap">
          <NavigationBar
            logoOnClick={() => { history.push('/'); }}
            rightButton={{
              label: 'Logout',
              onClick: () => { history.push('/logout'); },
            }}
          />
          {
            this.state.viewSwitchOptions.length
              ? (
                <div className="dashboard-subnavigation-bar">
                  <CheckboxFields
                    buttonized
                    name="test"
                    onChange={this.handleViewSwitch}
                    options={this.state.viewSwitchOptions}
                  />
                </div>
              ) : null
          }
        </div>
        <div className="dashboard-content-wrap">
          <div className="dashboard-side-nav-wrap">
            <SideNavigationBar
              style={{ paddingTop: this.state.viewSwitchOptions.length ? '200px' : 'auto' }}
              options={[
                {
                  label: 'Dashboard',
                  onClick: () => { history.push(`${this.pathPrefix(viewType)}/dashboard`); },
                  icon: 'clusters',
                  active: (activeOption === 'dashboard'),
                },
                ...(viewType === 'admin' || viewType === 'manager' ? [
                  {
                    label: 'Team',
                    onClick: () => { history.push(`${this.pathPrefix(viewType)}/team`); },
                    icon: 'users',
                    active: (activeOption === 'team'),
                  },
                  {
                    label: 'Payouts',
                    onClick: () => { history.push(`${this.pathPrefix(viewType)}/payouts`); },
                    icon: 'cart',
                    active: (activeOption === 'payouts'),
                  },
                ] : []),
                {
                  label: 'Pipeline',
                  onClick: () => { history.push(`${this.pathPrefix(viewType)}/pipeline`); },
                  icon: 'list-unordered',
                  active: (activeOption === 'pipeline'),
                  ...(viewType !== 'admin' && viewType !== 'manager' ? {
                    subOptions: [
                      {
                        label: 'Contacts',
                        onClick: () => { history.push(`${this.pathPrefix(viewType)}/pipeline/contacts`); },
                        active: activeSuboption.includes('/pipeline/contacts'),
                      },
                      {
                        label: 'Meetings',
                        onClick: () => { history.push(`${this.pathPrefix(viewType)}/pipeline/meetings`); },
                        active: activeSuboption.includes('/pipeline/meetings'),
                      },
                    ],
                  } : {}),
                },
                {
                  label: 'Accounts',
                  onClick: () => { history.push(`${this.pathPrefix(viewType)}/accounts/open`); },
                  icon: 'users',
                  active: (activeOption === 'accounts'),
                },
                {
                  label: 'Referrals',
                  onClick: () => { history.push(`${this.pathPrefix(viewType)}/referrals`); },
                  icon: 'star',
                  active: (activeOption === 'referrals'),
                },
                {
                  label: 'Statistics',
                  onClick: () => { history.push(`${this.pathPrefix(viewType)}/statistics`); },
                  icon: 'chart-pie',
                  active: (activeOption === 'statistics'),
                },
                {
                  label: 'User Account',
                  onClick: () => { history.push(`${this.pathPrefix(viewType)}/user-account`); },
                  icon: 'lock',
                  active: (activeOption === 'user-account'),
                  subOptions: [
                    {
                      label: 'Account Settings',
                      active: (activeSuboption === 'account-settings'),
                      onClick: () => { history.push(`${this.pathPrefix(viewType)}/user-account/account-settings`); },
                    },
                    {
                      label: 'Payout Preferences',
                      active: (activeSuboption === 'payout-preferences'),
                      onClick: () => { history.push(`${this.pathPrefix(viewType)}/user-account/payout-preferences`); },
                    },
                    {
                      label: 'Reset Password',
                      active: (activeSuboption === 'password-reset'),
                      onClick: () => { history.push(`${this.pathPrefix(viewType)}/user-account/password-reset`); },
                    },
                  ],
                },
              ]}
            />
          </div>
          {
            this.props.secondarySidebarOptions.length
              ? (
                <div>
                  <div className="dashboard-secondary-sidebar with-sub-navigation">
                    {
                      /* eslint-disable react/no-array-index-key */
                      this.props.secondarySidebarOptions.map((option, index) => (
                        <div
                          key={index}
                          className={`dashboard-secondary-sidebar-list${this.state.secondarySidebarActiveItemIndex === index ? ' active' : ''}`}
                          onClick={() => this.subSidebarItemClick(index, option.onClick)}
                        >
                          <span className="dashboard-secondary-sidebar-list-number">
                            {index + 1}
                          </span>
                          <span className="dashboard-secondary-sidebar-list-label">
                            {option.label}
                          </span>
                        </div>
                      ))
                      /* eslint-enable react/no-array-index-key */
                    }
                  </div>
                </div>
              )
              : null
          }
          {
            this.props.secondarySidebarComponent
              ? (
                <div>
                  <div className="dashboard-secondary-sidebar with-sub-navigation component">
                    {this.props.secondarySidebarComponent}
                  </div>
                </div>
              )
              : null
          }
          <div className="dashboard-content with-sub-navigation">
            {children}
          </div>
        </div>
        <div className="dashboard-footer">
          <div className={`dashboard-footer-menu ${this.props.secondarySidebarOptions.length ? 'with-secondary-sidebar' : ''} ${this.props.secondarySidebarComponent ? 'with-secondary-sidebar-component' : ''}`}>
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
          <div className={`dashboard-footer-bg-curve ${this.props.secondarySidebarComponent ? 'with-secondary-sidebar-component' : ''}`}>
            <svg xmlns="http://www.w3.org/2000/svg" width="2000" height="568" viewBox="0 0 2000 568">
              <path d="M2000 0v572.715H0v-69.097C839.716 471.725 1506.383 303.852 2000 0z" fill="#FFF" fillRule="evenodd" />
            </svg>
          </div>
        </div>
      </div>
    );
  }
}

export default SalesDashboardLayout;
