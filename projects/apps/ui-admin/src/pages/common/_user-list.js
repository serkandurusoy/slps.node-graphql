/* eslint-disable no-restricted-globals */
import React from 'react';
import PropTypes from 'prop-types';
import { compose, withProps } from 'recompose';
import { connect } from 'react-redux';
import { userApi, accountsApi } from '@sloops/library-ui-data-wrappers';
import { Layouts } from '@sloops/library-ui-components';

// TODO: for now not used, but some of 'actions' code should be reused in admin/team

const UserListItemComponent = ({
  user, // eslint-disable-line react/prop-types
  cancelInvitation, // eslint-disable-line react/prop-types
  toggleUserEnabledDisabled, // eslint-disable-line react/prop-types
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
                      ? 'disable this user'
                      : 'make this user active'
                }?`);
                if (confirmed) {
                  await (user.pendingInvitation
                    ? cancelInvitation
                    : toggleUserEnabledDisabled
                  )({ userId: parseInt(user.id, 10) });
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
)(UserListItemComponent);

// eslint-disable-next-line react/prop-types
const UserList = ({ me, userList, history }) => (
  <Layouts.AdminDashboardLayout history={history}>
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
          />))
        }
      </tbody>
    </table>
  </Layouts.AdminDashboardLayout>
);

UserList.propTypes = {
  history: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
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
