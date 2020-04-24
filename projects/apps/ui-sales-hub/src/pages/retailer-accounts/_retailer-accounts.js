import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { accountsApi } from '@sloops/library-ui-data-wrappers';
import { DataList, Layouts, TabNav, Button, Forms, Icon, Modal } from '@sloops/library-ui-components';
import { setViewType } from '../../store/actions';

// Dynamic paths for submenu items
// TODO: we probably can refactor submenu items and create local component for that
const getSubNavPath = (currentPath, pathToGo) => {
  let path = pathToGo;
  if (currentPath.includes('/admin')) path = `/admin${pathToGo}`;
  if (currentPath.includes('/manager')) path = `/manager${pathToGo}`;
  return path;
};

// TODO: just mocked data

const statusFilterOptions = [
  {
    value: 'pending-registration',
    label: 'Pending Registration',
  },
  {
    value: 'waiting-for-shop-information',
    label: 'Waiting for shop information',
  },
  {
    value: 'waiting-for-inventory',
    label: 'Waiting for inventory',
  },
  {
    value: 'waiting-for-payment-information',
    label: 'Waiting for Payment information',
  },
];

const dataListHeader = {
  fullName: { label: 'Full Name', type: DataList.Text },
  shopName: { label: 'Shop Name', type: DataList.Text },
  lastStatusChange: { label: 'Last status change', type: DataList.FormattedDate },
  address: { label: 'Address', type: DataList.Text },
  email: { label: 'Email', type: DataList.Email },
  phoneNumber: { label: 'Phone Number', type: DataList.PhoneNumber },
  status: { label: 'Status', type: DataList.Text },
  firstButton: { label: '\u00a0', type: DataList.Button, width: 40 },
};
const dataListData = (history, location) => ([
  {
    fullName: { label: 'Jon Doe 22' },
    shopName: { label: 'Shop One' },
    lastStatusChange: 1506419512153,
    address: { label: 'High Street 1, EV123, London' },
    email: { label: 'test21321@email.com', email: 'test12312@email.com' },
    phoneNumber: '333 785 4459',
    status: { label: 'Closed', type: 'closed' },
    firstButton: { icon: 'arrow-right', onClick: () => history.push(getSubNavPath(location.pathname, '/accounts/business/1/preview')) },
  },
  {
    fullName: { label: 'Jane Doedoedoedoe 222' },
    shopName: { label: 'Shop Two' },
    lastStatusChange: 1506419512153,
    address: { label: 'High Street 1, EV123, London' },
    email: { label: 'test2232@email.com', email: 'test222@email.com' },
    phoneNumber: '333 785 4459',
    status: { label: 'Waiting for inventory', type: 'waiting' },
    firstButton: { icon: 'arrow-right', onClick: () => history.push(getSubNavPath(location.pathname, '/accounts/business/2/preview')) },
  },
]);

const dataListHeaderAdminManager = {
  responsible: { label: 'Responsible', type: DataList.Text },
  shopName: { label: 'Shop Name', type: DataList.Text },
  lastStatusChange: { label: 'Last status change', type: DataList.FormattedDate },
  status: { label: 'Status', type: DataList.Text },
  firstButton: { label: '\u00a0', type: DataList.Button, width: 40 },
};
const dataListDataAdminManager = (history, location) => ([
  {
    responsible: { label: 'Jon Doe 22' },
    shopName: { label: 'Shop One' },
    lastStatusChange: 1506419512153,
    status: { label: 'Closed', type: 'closed' },
    firstButton: { icon: 'arrow-right', onClick: () => history.push(getSubNavPath(location.pathname, '/accounts/business/1/preview')) },
  },
  {
    responsible: { label: 'Jane Doedoedoedoe 222' },
    shopName: { label: 'Shop Two' },
    lastStatusChange: 1506419512153,
    status: { label: 'Waiting for inventory', type: 'waiting' },
    firstButton: { icon: 'arrow-right', onClick: () => history.push(getSubNavPath(location.pathname, '/accounts/business/2/preview')) },
  },
]);

const dataListHeaderCompleted = {
  fullName: { label: 'Full Name', type: DataList.Text },
  shopName: { label: 'Shop Name', type: DataList.Text },
  lastStatusChange: { label: 'Last status change', type: DataList.FormattedDate },
  status: { label: 'Status', type: DataList.Text },
  firstButton: { label: '\u00a0', type: DataList.Button, width: 40 },
};
const dataListDataCompleted = (history, location) => ([
  {
    fullName: { label: 'Jon Doe 22' },
    shopName: { label: 'Shop One' },
    lastStatusChange: 1506419512153,
    status: { label: 'Closed', type: 'closed' },
    firstButton: { icon: 'arrow-right', onClick: () => history.push(getSubNavPath(location.pathname, '/accounts/business/1/preview')) },
  },
  {
    fullName: { label: 'Jane Doedoedoedoe 222' },
    shopName: { label: 'Shop Two' },
    lastStatusChange: 1506419512153,
    status: { label: 'Closed', type: 'closed' },
    firstButton: { icon: 'arrow-right', onClick: () => history.push(getSubNavPath(location.pathname, '/accounts/business/2/preview')) },
  },
]);

const RetailerAccountsComponent = ({
  history,
  location,
  dataList,
  dataHeader,
  me,
  viewType,
  setViewTypeDispatch,
  openVerificationModal,
  closeVerificationModal,
  isVerificationModalOpened,
  addNewAccountRedirect,
}) => {
  const submenuItems = [
    {
      label: 'Open',
      onClick: () => history.push(getSubNavPath(location.pathname, '/accounts/open')),
      active: location.pathname.includes('/accounts/open'),
    },
    {
      label: 'Completed',
      onClick: () => history.push(getSubNavPath(location.pathname, '/accounts/completed')),
      active: location.pathname.includes('/accounts/completed'),
    },
  ];
  return (
    <Layouts.SalesDashboardLayout
      history={history}
      location={location}
      activeOption="accounts"
      activeSuboption={location.pathname}
      isAdministrator={me.me.isAdministrator}
      isSalesManager={me.me.isSalesManager}
      isSalesRepresentative={me.me.isSalesRepresentative}
      viewType={viewType}
      switchView={setViewTypeDispatch}
    >
      <div>
        <TabNav items={submenuItems} />
        <div className="pages-search-tools">
          <div className="pages-search-field-wrapper small margin-right-20">
            <Button
              className="pages-search-btn" // TODO: create text field with action buttons
              onClick={() => {}}
              icon={<Icon name="search" />}
              iconPosition="right"
            />
            <Forms.TextFieldInput
              className="pages-search-field"
              name="pages-leads-search"
              type="text"
              placeHolder="Search (Name, email, phone number)"
            />
          </div>
          {
            location.pathname.includes('/accounts/open') && (viewType === 'admin' || viewType === 'manager')
              ? (
                <div className="pages-search-field-wrapper small selector">
                  <Forms.SelectFieldInput placeholder="Status Filter" options={statusFilterOptions} />
                </div>
              ) : null
          }
          {
            location.pathname.includes('/accounts/open')
              ? (
                <div className="pages-buttons">
                  <Button label="Contact verification" onClick={openVerificationModal} />
                  {viewType === 'representative' ? <Button label="Add new account" onClick={addNewAccountRedirect} /> : null}
                </div>
              ) : (
                <div className="pages-info-block">
                  <div>Total payout from completed accounts: 3000$</div>
                  <div>Payout from completed accounts in [Current Month]: 1000$</div>
                </div>
              )
          }
        </div>
        <div>
          <DataList.DataList header={dataHeader} data={dataList} />
        </div>
        <Modal
          maxWidth="420px"
          isOpen={isVerificationModalOpened}
          title="Contact verification"
          subtitle="To see if the lead or an account already exists in our database provide details below"
          onCloseModal={closeVerificationModal}
        >
          {/* TODO: Move it to separated component and wrap with Redux Form */}
          <div className="text-center">
            <Forms.TextFieldInput name="e-mail" type="text" label="E-mail address" />
            <Forms.TextFieldInput name="shop-name" type="text" label="Shop name" />
            <Forms.TextFieldInput name="address" type="text" label="Address" />
            <Button label="Send" onClick={closeVerificationModal} />
          </div>
        </Modal>
      </div>
    </Layouts.SalesDashboardLayout>
  );
};

RetailerAccountsComponent.propTypes = {
  history: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  location: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  dataList: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
  dataHeader: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  me: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  viewType: PropTypes.string,
  setViewTypeDispatch: PropTypes.func,
  isVerificationModalOpened: PropTypes.bool.isRequired,
  closeVerificationModal: PropTypes.func.isRequired,
  openVerificationModal: PropTypes.func.isRequired,
  addNewAccountRedirect: PropTypes.func.isRequired,
};

RetailerAccountsComponent.defaultProps = {
  viewType: '',
  setViewTypeDispatch: () => {},
};

// TODO: class just for future data integration...
class RetailerAccounts extends Component {
  state = {
    isVerificationModalOpened: false,
  }
  closeVerificationModal = () => {
    this.setState({
      isVerificationModalOpened: false,
    });
  }
  openVerificationModal = () => {
    this.setState({
      isVerificationModalOpened: true,
    });
  }
  addNewAccountRedirect = () => {
    if (this.props.viewType === 'admin' || this.props.viewType === 'manager') {
      this.props.history.push(`/${this.props.viewType}/accounts/add`);
    } else {
      this.props.history.push('/accounts/add');
    }
  }
  render() {
    const dataList = (this.props.viewType === 'admin' || this.props.viewType === 'manager' ? dataListDataAdminManager(this.props.history, this.props.location) : dataListData(this.props.history, this.props.location));
    const dataHeader = (this.props.viewType === 'admin' || this.props.viewType === 'manager' ? dataListHeaderAdminManager : dataListHeader);
    return (
      <RetailerAccountsComponent
        dataList={this.props.location.pathname.includes('/accounts/open') ? dataList : dataListDataCompleted(this.props.history, this.props.location)}
        dataHeader={this.props.location.pathname.includes('/accounts/open') ? dataHeader : dataListHeaderCompleted}
        currentUser={this.props.me.me}
        openVerificationModal={this.openVerificationModal}
        closeVerificationModal={this.closeVerificationModal}
        isVerificationModalOpened={this.state.isVerificationModalOpened}
        addNewAccountRedirect={this.addNewAccountRedirect}
        {...this.props}
      />
    );
  }
}

RetailerAccounts.propTypes = {
  location: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  viewType: PropTypes.string.isRequired,
  me: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  history: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

RetailerAccounts.defaultProps = {
  me: {},
};

export default compose(
  connect(
    ({
      ui: {
        account: {
          id,
        },
        viewType,
      },
    }) => ({
      userId: id,
      viewType,
    }),
    {
      setViewTypeDispatch: setViewType,
    },
  ),
  accountsApi.query.me,
)(RetailerAccounts);
