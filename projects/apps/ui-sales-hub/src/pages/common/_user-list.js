/* eslint-disable no-restricted-globals */
import React from 'react';
import PropTypes from 'prop-types';
import { compose, withProps } from 'recompose';
import { connect } from 'react-redux';
import { userApi, accountsApi } from '@sloops/library-ui-data-wrappers';
import { Layouts } from '@sloops/library-ui-components';

const UserListItemComponent = ({
  user, // eslint-disable-line react/prop-types
  userList, // eslint-disable-line react/prop-types
  cancelInvitation, // eslint-disable-line react/prop-types
  toggleUserEnabledDisabled, // eslint-disable-line react/prop-types
  reassignTeamManager, // eslint-disable-line react/prop-types
  currentUser, // eslint-disable-line react/prop-types
}) => (
  <tr>
    <td>{user.firstName} {user.lastName}</td>
    <td><a href={`mailto:${user.email}`}>{user.email}</a></td>
    <td>
      {
        user.pendingInvitation
          ? 'pending'
          : user.enabled
            ? 'active'
            : 'disabled'
      }
    </td>
    <td>
      {
        (
          user.pendingInvitation
          || (
            currentUser.isAdministrator && !user.isAdministrator
            && currentUser.id !== parseInt(user.id, 10)
          )
        )
          ? (
            <a
              onClick={async (e) => {
                e.preventDefault();
                const confirmed = confirm(`Are you sure you want to ${
                  user.pendingInvitation
                    ? 'cancel the invitation'
                    : user.enabled
                      ? `disable this ${
                        user.isSalesManager
                          ? 'sales manager'
                          : user.isSalesRepresentative
                            ? 'sales representative'
                            : 'user'
                      }`
                      : 'make this user active'
                }?`);
                if (confirmed) {
                  const args = { userId: parseInt(user.id, 10) };
                  if (user.pendingInvitation) {
                    await cancelInvitation(args);
                  } else if (!user.isSalesManager) {
                    await toggleUserEnabledDisabled(args);
                  } else if (!user.enabled) {
                    await toggleUserEnabledDisabled(args);
                  } else {
                    const managerTeam = userList.filter(anyUser =>
                      parseInt(anyUser.manager, 10) === parseInt(user.id, 10));
                    const otherManagers = [...userList.filter(anyUser =>
                      anyUser.enabled
                      && anyUser.isSalesManager
                      && parseInt(anyUser.id, 10) !== parseInt(user.id, 10))]
                      .sort((l, r) => (l.email > r.email ? 1 : -1));
                    if (!managerTeam.length) {
                      await toggleUserEnabledDisabled(args);
                    } else if (!otherManagers.length) {
                      alert('Currently there is not any other active Sales Manager to connect Sales Representatives. Therefore you cannot disable this Sales Manager.');
                    } else {
                      const newManager = prompt(
                        `Please select a new manager to transfer this team:\n\n* ${otherManagers.map(manager => manager.email).join('\n* ')}`,
                        otherManagers[0].email,
                      );
                      if (newManager) {
                        const oldManagerId = parseInt(user.id, 10);
                        const newManagerDoc = otherManagers.find(manager =>
                          manager.email === newManager);
                        if (newManagerDoc) {
                          const newManagerId = parseInt(newManagerDoc.id, 10);
                          await reassignTeamManager({ oldManagerId, newManagerId });
                          await toggleUserEnabledDisabled(args);
                        } else {
                          alert('You entered an invalid email address');
                        }
                      }
                    }
                  }
                }
              }}
            >
              {
                user.pendingInvitation
                  ? 'cancel invitation'
                  : user.enabled
                    ? 'disable user'
                    : 'enable user'
              }
            </a>
          )
          : null
      }
    </td>
  </tr>
);

const UserListItem = compose(
  accountsApi.mutation.cancelInvitation,
  withProps(({ makeApiCall }) => ({ cancelInvitation: makeApiCall })),
  userApi.mutation.toggleUserEnabledDisabled,
  withProps(({ makeApiCall }) => ({ toggleUserEnabledDisabled: makeApiCall })),
  userApi.mutation.reassignTeamManager,
  withProps(({ makeApiCall }) => ({ reassignTeamManager: makeApiCall })),
)(UserListItemComponent);

// eslint-disable-next-line react/prop-types
const UserList = ({
  me,
  userList,
  history,
  location,
}) => (
  <Layouts.SalesDashboardLayout history={history} location={location}>
    <h2>User list</h2>
    { (me.loading || userList.loading) && <div>loading...</div> }
    <table style={{ width: '100%' }}>
      <thead>
        <tr style={{ textAlign: 'left' }}>
          <th>Name</th>
          <th>Email</th>
          <th>Status</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {
          userList.users && userList.users.map(user => (<UserListItem
            key={user.id}
            currentUser={me.me}
            user={user}
            userList={userList.users}
          />))
        }
      </tbody>
    </table>
  </Layouts.SalesDashboardLayout>
);

UserList.propTypes = {
  me: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  userList: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  history: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  location: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

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
  userApi.query.userList,
)(UserList);
