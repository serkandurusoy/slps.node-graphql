import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TabNav, DataList, Button, Icon, Forms } from '@sloops/library-ui-components';
import { ProspectsAssignModal } from '../../components/prospects-assign-modal';

const submenuItems = [
  {
    label: 'Prospects Inactive',
    onClick: () => {},
    active: true,
  },
];

const dataListHeader = {
  responsible: { label: 'Responsible', type: DataList.Button },
  fullName: { label: 'Full Name', type: DataList.Text },
  address: { label: 'Address', type: DataList.Text },
  email: { label: 'Email', type: DataList.Email },
  phoneNumber: { label: 'Phone Number', type: DataList.PhoneNumber },
  firstButton: { label: '\u00a0', type: DataList.Button, width: 40 },
};
const dataListData = (c, history, editPath) => ([
  {
    responsible: { label: 'Assign', onClick: () => { c.setState({ isAssignModalOpened: true }); } },
    fullName: { label: 'Jon Doe 22' },
    address: { label: 'High Street 1, EV123, London' },
    email: { label: 'test21321@email.com', email: 'test12312@email.com' },
    phoneNumber: '333 785 4459',
    firstButton: { label: 'Edit', icon: 'edit', onClick: () => history.push(`${editPath}/steve-novak/45678/edit`) },
  },
  {
    responsible: { label: 'Assign', onClick: () => { c.setState({ isAssignModalOpened: true }); } },
    fullName: { label: 'Jane Doedoedoedoe 222' },
    address: { label: 'High Street 1, EV123, London' },
    email: { label: 'test2232@email.com', email: 'test222@email.com' },
    phoneNumber: '333 785 4459',
    firstButton: { label: 'Edit', icon: 'edit', onClick: () => history.push(`${editPath}/steve-novak/45678/edit`) },
  },
]);

const DashboardAdminManagerComponent = ({
  handleGoToPayouts,
  header,
  data,
  subItems,
  isAssignModalOpened,
  closeAssignModal,
}) => (
  <div className="dashboard-page dashboard-page-admin-manager">
    <div className="dashboard-page-content">
      <div className="dashboard-page-tabnav">
        <TabNav items={subItems} />
      </div>
      <div className="dashboard-page-user">
        <span className="user-name">
          John Doe <span>(0948123)</span>
        </span>
      </div>
    </div>
    <div className="dashboard-page-sidebar">
      <div className="dashboard-info-badge">
        <div className="dashboard-badge-amount">
          212.398 €
        </div>
        <div className="dashboard-badge-label">
          Total available payout
        </div>
      </div>
    </div>
    <div>
      <div className="pages-search-tools">
        <div className="pages-search-field-wrapper">
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
        <div className="pages-info-block">
          <Button label="Go to payouts" danger onClick={handleGoToPayouts} />
        </div>
      </div>
      <DataList.DataList header={header} data={data} />
      <ProspectsAssignModal isOpen={isAssignModalOpened} onCloseModal={closeAssignModal} />
    </div>
  </div>
);

DashboardAdminManagerComponent.propTypes = {
  handleGoToPayouts: PropTypes.func.isRequired,
  header: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  data: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
  subItems: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
  isAssignModalOpened: PropTypes.bool.isRequired,
  closeAssignModal: PropTypes.func.isRequired,
};

// TODO: class just for future data integration...
class DashboardAdminManager extends Component {
  static propTypes = {
    viewType: PropTypes.string.isRequired,
    history: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  }
  state = {
    isAssignModalOpened: false,
  }
  closeAssignModal = () => {
    this.setState({ isAssignModalOpened: false });
  }
  editPath = () => {
    let url = '/pipeline/contacts/prospects';
    if (this.props.viewType === 'admin' || this.props.viewType === 'manager') {
      url = `/${this.props.viewType}/pipeline/contacts/prospects-inactive`;
    }
    return url;
  }
  render() {
    return (
      <DashboardAdminManagerComponent
        header={dataListHeader}
        data={dataListData(this, this.props.history, this.editPath())}
        subItems={submenuItems}
        isAssignModalOpened={this.state.isAssignModalOpened}
        closeAssignModal={this.closeAssignModal}
        {...this.props}
      />
    );
  }
}

export default DashboardAdminManager;
