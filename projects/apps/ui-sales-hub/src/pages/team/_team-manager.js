/* eslint-disable react/no-array-index-key */
/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose, withProps } from 'recompose';
import { connect } from 'react-redux';
import Alert from 'react-s-alert';
import { DataList, Forms, Icon, Button, Modal } from '@sloops/library-ui-components';
import { schemas } from '@sloops/library-utils';
import { userApi, accountsApi } from '@sloops/library-ui-data-wrappers';

const dataListHeader = {
  fullName: { label: 'Full Name', type: DataList.Text },
  prospects: { label: 'Prospects', type: DataList.Text },
  leads: { label: 'Leads', type: DataList.Text },
  accountsOpen: { label: 'Accounts Open', type: DataList.Text },
  accountsCompleted: { label: 'Accounts Completed', type: DataList.Text },
  status: { label: 'Status', type: DataList.Text },
  action: { label: 'Action', type: DataList.Button, width: 40 },
  profile: { label: '\u00a0', type: DataList.Button, width: 40 },
};

const invitationArrayRenderer = ({
  fields,
  meta: { error },
  allErrors,
}) => (
  <div>
    { error && <div>{ error }</div> }
    <table className="pages-table with-spacing valign-top">
      <thead>
        <tr style={{ textAlign: 'left' }}>
          <th>Email</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th />
          <th />
        </tr>
      </thead>
      <tbody>
        {
          fields.map((invitation, ix) => {
            const firstName = `${invitation}.firstName`;
            const firstNameError = allErrors && allErrors[firstName];

            const lastName = `${invitation}.lastName`;
            const lastNameError = allErrors && allErrors[lastName];

            const email = `${invitation}.email`;
            const emailError = allErrors && allErrors[email];

            return (
              <tr key={ix}>
                <td>
                  <Forms.TextField
                    type="text"
                    icon={<Icon
                      name="envelope"
                      color="#0e345e"
                      style={{
                        heigth: '18px',
                        width: '18px',
                      }}
                    />}
                    normalize={value => value && value.trim()}
                    placeHolder="Email"
                    errorMessage={emailError && emailError.split(`${invitation}.`)[1]}
                    name={email}
                    className="pages-table-td-text-field"
                  />
                </td>
                <td>
                  <Forms.TextField
                    type="text"
                    icon={<Icon
                      name="user"
                      color="#0e345e"
                      style={{
                        heigth: '18px',
                        width: '18px',
                      }}
                    />}
                    placeHolder="First Name"
                    errorMessage={firstNameError && firstNameError.split(`${invitation}.`)[1]}
                    name={firstName}
                    className="pages-table-td-text-field"
                  />
                </td>
                <td>
                  <Forms.TextField
                    type="text"
                    icon={<Icon
                      name="user"
                      color="#0e345e"
                      style={{
                        heigth: '18px',
                        width: '18px',
                      }}
                    />}
                    placeHolder="Last Name"
                    errorMessage={lastNameError && lastNameError.split(`${invitation}.`)[1]}
                    name={lastName}
                    className="pages-table-td-text-field"
                  />
                </td>
                {
                  ix === fields.length - 1 &&
                  <td>
                    <Button
                      onClick={() => fields.push()}
                      icon={<Icon name="circled-add" />}
                      iconPosition="right"
                    />
                  </td>
                }
                {
                  fields.length > 1 &&
                  <td className="no-spacing">
                    <Button
                      onClick={() => fields.remove(ix)}
                      icon={<Icon name="x" />}
                      iconPosition="right"
                    />
                  </td>
                }
              </tr>
            );
          })
        }
      </tbody>
    </table>
  </div>
);

const Fields = ({ allErrors }) => (
  <div>
    <Forms.FieldArray
      name="invitations"
      allErrors={allErrors}
      component={invitationArrayRenderer}
    />
  </div>
);

const formProvider = Forms.Form({
  displayErrorList: false,
  formName: 'addTeamMembers',
  submitLabel: 'Send Invitation',
  schema: schemas.accounts.sendInvitations,
  submitHandler: async (
    {
      role,
      manager,
      invitations,
    },
    dispatch,
    props,
  ) => props.makeApiCall({
    role,
    manager,
    invitations: invitations.map(({
      firstName,
      lastName,
      email,
    }) => ({
      firstName,
      lastName,
      email,
    })),
  }),
  successHandler: (reset, result, dispatch, props) => { // eslint-disable-line no-unused-vars
    reset();
    props.closeInvitationModal();
    Alert.success('Intivitations have been send');
  },
  errorHandler: (error, dispatch) => { // eslint-disable-line no-unused-vars
    Alert.success('Invitations cannot be send: ', error);
  },
});

export const AddTeamMembersForm = compose(
  connect(
    ({
      ui: {
        account: {
          id,
        },
      },
    }) => ({
      currentUserId: id,
    }),
    null,
  ),
  withProps(({ currentUserId, closeInvitationModal }) => ({
    initialValues: {
      role: 'isSalesRepresentative',
      manager: currentUserId,
      invitations: [
        {
          firstName: '',
          lastName: '',
          email: '',
        },
      ],
    },
    closeInvitationModal,
  })),
  accountsApi.mutation.sendInvitations,
  formProvider,
)(Fields);

const TeamAdminManagerComponent = ({
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
          name="full-name"
          type="text"
          placeHolder="Search (Full name)"
        />
      </div>
      <div className="pages-buttons">
        <Button label="Add New Team Member" onClick={openInvitationModal} />
      </div>
    </div>
    <DataList.DataList header={header} data={data} />
    <Modal
      maxWidth="800px"
      isOpen={isInvitationModalOpen}
      title="Invite New Team Member"
      onCloseModal={closeInvitationModal}
    >
      <AddTeamMembersForm closeInvitationModal={closeInvitationModal} />
    </Modal>
  </div>
);

TeamAdminManagerComponent.propTypes = {
  header: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  data: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
  closeInvitationModal: PropTypes.func.isRequired,
  openInvitationModal: PropTypes.func.isRequired,
  isInvitationModalOpen: PropTypes.bool.isRequired,
};

// TODO: class just for future data integration...
class TeamAdminManager extends Component {
  state = {
    isInvitationModalOpen: false,
  }
  getStatus = (t) => {
    if (t.pendingInvitation) return { label: 'Pending', type: 'waiting' };
    if (t.enabled) return { label: 'Enabled', type: 'confirmed' };
    return { label: 'Disabled', type: 'closed' };
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
    const { teamList: { teamList, loading }, history, match } = this.props;
    const dataListData = teamList && teamList.map(t => (
      // TODO: we need proper data from api
      {
        fullName: { label: `${t.firstName} ${t.lastName}` },
        prospects: { label: '100' },
        leads: { label: '50' },
        accountsOpen: { label: '15' },
        accountsCompleted: { label: '5' },
        status: this.getStatus(t),
        action: { label: 'Edit', icon: 'edit', onClick() {} },
        profile: {
          label: 'Profile',
          onClick: () => history.push(`${match.url}/${t.firstName}-${t.lastName}/${t.id}`),
        },
      }
    ));
    if (loading) return <div>loading...</div>;
    return (
      <TeamAdminManagerComponent
        header={dataListHeader}
        data={dataListData}
        closeInvitationModal={this.closeInvitationModal}
        openInvitationModal={this.openInvitationModal}
        isInvitationModalOpen={this.state.isInvitationModalOpen}
      />
    );
  }
}

export default userApi.query.teamList(TeamAdminManager);
