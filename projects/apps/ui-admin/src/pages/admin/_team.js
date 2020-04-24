/* eslint-disable no-alert */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose, withProps } from 'recompose';
import { connect } from 'react-redux';
import Alert from 'react-s-alert';
import { userApi, accountsApi } from '@sloops/library-ui-data-wrappers';
import { DataList, Layouts, TabNav, Button, Forms, Icon, Modal } from '@sloops/library-ui-components';
import { Loading } from '../common';
import { SendInvitationModalContent } from './';

const dataListHeader = {
  fullName: { label: 'Full Name', type: DataList.Text },
  email: { label: 'Email', type: DataList.Email },
  status: { label: 'Status', type: DataList.Text },
  actions: { label: 'Actions', type: DataList.Button },
};

const AdminTeamComponent = ({
  history,
  location,
  dataList,
  dataHeader,
  isInvitationModalOpened,
  isConfirmationModalOpened,
  openInvitationModal,
  closeInvitationModal,
  closeConfirmationModal,
  confirmationQuestion,
  confirmAction,
}) => {
  const submenuItems = [
    {
      label: 'Team',
      onClick: () => history.push('/team'),
      active: location.pathname === '/team',
    },
  ];
  return (
    <Layouts.AdminDashboardLayout
      history={history}
      activeOption="admin"
      activeSuboption={location.pathname}
    >
      <div>
        <TabNav items={submenuItems} />
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
          <div className="pages-buttons">
            <Button label="Add new team member" onClick={openInvitationModal} />
          </div>
        </div>
        <div>
          <DataList.DataList header={dataHeader} data={dataList} />
        </div>
        <Modal
          maxWidth="800px"
          isOpen={isInvitationModalOpened}
          title="Invite New Team Member"
          onCloseModal={closeInvitationModal}
        >
          <SendInvitationModalContent
            closeInvitationModal={closeInvitationModal}
            history={history}
          />
        </Modal>
        <Modal
          title={confirmationQuestion}
          isOpen={isConfirmationModalOpened}
          noCloseButton
        >
          <div className="modal-buttons">
            <Button label="Yes" onClick={confirmAction} />
            <Button label="No" onClick={closeConfirmationModal} danger />
          </div>
        </Modal>
      </div>
    </Layouts.AdminDashboardLayout>
  );
};

AdminTeamComponent.propTypes = {
  history: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  location: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  dataList: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
  dataHeader: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  isInvitationModalOpened: PropTypes.bool.isRequired,
  isConfirmationModalOpened: PropTypes.bool.isRequired,
  closeInvitationModal: PropTypes.func.isRequired,
  openInvitationModal: PropTypes.func.isRequired,
  closeConfirmationModal: PropTypes.func.isRequired,
  confirmationQuestion: PropTypes.string.isRequired,
  confirmAction: PropTypes.func.isRequired,
};

class AdminTeam extends Component {
  static propTypes = {
    location: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
    history: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
    me: PropTypes.object, // eslint-disable-line react/forbid-prop-types
    userList: PropTypes.object, // eslint-disable-line react/forbid-prop-types
    cancelInvitation: PropTypes.func,
    toggleUserEnabledDisabled: PropTypes.func,
  }
  static defaultProps = {
    me: {},
    userList: {},
    cancelInvitation: () => {},
    toggleUserEnabledDisabled: () => {},
  }
  state = {
    isInvitationModalOpened: false,
    isConfirmationModalOpened: false,
    confirmationQuestion: '',
    confirmationUser: {},
  }
  dataListStatus = user => ({
    label: user.pendingInvitation ? 'Pending' : user.enabled ? 'Active' : 'Disabled',
    type: user.pendingInvitation ? 'waiting' : user.enabled ? 'confirmed' : 'closed',
  })
  dataListActions = (user) => {
    const onClick = () => {
      this.openConfirmationModal(`Are you sure you want to ${
        user.pendingInvitation
          ? 'cancel the invitation'
          : user.enabled
            ? 'disable this user'
            : 'make this user active'
      }?`, user);
    };
    if (
      user.pendingInvitation
      || (
        this.props.me.me.isAdministrator && !user.isAdministrator
        && this.props.me.me.id !== parseInt(user.id, 10)
      )
    ) {
      return (
        user.pendingInvitation
          ? {
            label: 'Cancel invitation',
            icon: 'circled-x',
            danger: true,
            onClick: () => onClick(),
          } : user.enabled
            ? {
              label: 'Disable user',
              icon: 'lock',
              danger: true,
              onClick: () => onClick(),
            } : {
              label: 'Enable user',
              icon: 'circled-ok',
              onClick: () => onClick(),
            }
      );
    }
    return {
      label: '',
      icon: '',
      onClick: () => {},
    };
  }
  closeInvitationModal = () => {
    this.setState(() => ({ isInvitationModalOpened: false }));
  }
  openInvitationModal = () => {
    this.setState(() => ({ isInvitationModalOpened: true }));
  }
  confirmAction = () => {
    const alertMsg = (this.state.confirmationUser.pendingInvitation
      ? 'Successfully canceled!'
      : 'State changed!');
    (this.state.confirmationUser.pendingInvitation
      ? this.props.cancelInvitation
      : this.props.toggleUserEnabledDisabled
    )({ userId: parseInt(this.state.confirmationUser.id, 10) });
    this.closeConfirmationModal();
    Alert.success(alertMsg);
  }
  closeConfirmationModal = () => {
    this.setState(() => ({ isConfirmationModalOpened: false }));
  }
  openConfirmationModal = (question, user) => {
    this.setState(() => ({
      isConfirmationModalOpened: true,
      confirmationQuestion: question,
      confirmationUser: user,
    }));
  }
  render() {
    if (this.props.me.loading || this.props.userList.loading) {
      return <Loading history={this.props.history} />;
    }
    return (
      <AdminTeamComponent
        dataList={this.props.userList.users.map(user => ({
          fullName: { label: `${user.firstName} ${user.lastName}` },
          email: { label: user.email, email: user.email },
          status: this.dataListStatus(user),
          actions: this.dataListActions(user),
        }))}
        isInvitationModalOpened={this.state.isInvitationModalOpened}
        isConfirmationModalOpened={this.state.isConfirmationModalOpened}
        dataHeader={dataListHeader}
        closeInvitationModal={this.closeInvitationModal}
        openInvitationModal={this.openInvitationModal}
        closeConfirmationModal={this.closeConfirmationModal}
        openConfirmationModal={this.openConfirmationModal}
        confirmationQuestion={this.state.confirmationQuestion}
        confirmAction={this.confirmAction}
        {...this.props}
      />
    );
  }
}

export default compose(
  connect(
    ({
      ui: {
        account: {
          id,
        },
      },
    }) => ({
      userId: id,
    }),
    null,
  ),
  withProps(() => ({ appId: APP_ID })), // eslint-disable-line no-undef
  accountsApi.query.me,
  accountsApi.mutation.cancelInvitation,
  withProps(({ makeApiCall }) => ({ cancelInvitation: makeApiCall })),
  userApi.mutation.toggleUserEnabledDisabled,
  withProps(({ makeApiCall }) => ({ toggleUserEnabledDisabled: makeApiCall })),
  userApi.query.userList,
)(AdminTeam);
