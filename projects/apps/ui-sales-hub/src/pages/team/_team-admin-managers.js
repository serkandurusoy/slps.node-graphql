import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DataList, Forms, Icon, Button, Modal } from '@sloops/library-ui-components';
import { TeamAdminManagerInvitationForm } from './';

// TODO: just mocked data

const dataListHeader = {
  fullName: { label: 'Full Name', type: DataList.Text },
  reps: { label: 'Reps', type: DataList.Text },
  prospects: { label: 'Prospects', type: DataList.Text },
  leads: { label: 'Leads', type: DataList.Text },
  accountsOpen: { label: 'Accounts Open', type: DataList.Text },
  accountsCompleted: { label: 'Accounts Completed', type: DataList.Text },
  status: { label: 'Status', type: DataList.Text },
  action: { label: 'Action', type: DataList.Button, width: 40 },
  profile: { label: '\u00a0', type: DataList.Button, width: 40 },
};
const dataListData = [
  {
    fullName: { label: 'Jon Doe' },
    reps: { label: '22' },
    prospects: { label: '100' },
    leads: { label: '50' },
    accountsOpen: { label: '15' },
    accountsCompleted: { label: '5' },
    status: { label: 'Disabled', type: 'closed' },
    action: { label: 'Edit', icon: 'edit', onClick() {} },
    profile: { label: 'Profile', onClick() {} },
  },
  {
    fullName: { label: 'Jane Doe' },
    reps: { label: '25' },
    prospects: { label: '103' },
    leads: { label: '52' },
    accountsOpen: { label: '14' },
    accountsCompleted: { label: '6' },
    status: { label: 'Pending', type: 'waiting' },
    action: { label: 'Edit', icon: 'edit', onClick() {} },
    profile: { label: 'Profile', onClick() {} },
  },
];

const TeamAdminManagersComponent = ({
  header,
  data,
  closeInvitationModal,
  openInvitationModal,
  isInvitationModalOpen,
}) => (
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
          placeHolder="Search (Full name)"
        />
      </div>
      <div className="pages-buttons">
        <Button label="Add New Sales Manager" onClick={openInvitationModal} />
      </div>
    </div>
    <DataList.DataList header={header} data={data} />
    <Modal
      maxWidth="800px"
      isOpen={isInvitationModalOpen}
      title="Invite New Sales Manager"
      onCloseModal={closeInvitationModal}
    >
      <TeamAdminManagerInvitationForm
        closeInvitationModal={closeInvitationModal}
        invitationFor="manager"
      />
    </Modal>
  </div>
);

TeamAdminManagersComponent.propTypes = {
  header: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  data: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
  closeInvitationModal: PropTypes.func.isRequired,
  openInvitationModal: PropTypes.func.isRequired,
  isInvitationModalOpen: PropTypes.bool.isRequired,
};

// TODO: class just for future data integration...
class TeamAdminManagers extends Component {
  state = {
    isInvitationModalOpen: false,
  }
  closeInvitationModal = () => {
    this.setState({
      isInvitationModalOpen: false,
    });
  }
  openInvitationModal = () => {
    this.setState({
      isInvitationModalOpen: true,
    });
  }
  render() {
    return (
      <TeamAdminManagersComponent
        header={dataListHeader}
        data={dataListData}
        closeInvitationModal={this.closeInvitationModal}
        openInvitationModal={this.openInvitationModal}
        isInvitationModalOpen={this.state.isInvitationModalOpen}
      />
    );
  }
}

export default TeamAdminManagers;
