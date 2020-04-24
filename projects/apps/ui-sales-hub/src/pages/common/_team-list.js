/* eslint-disable no-restricted-globals */
import React from 'react';
import PropTypes from 'prop-types';
import { compose, withProps } from 'recompose';
import { Link } from 'react-router-dom';
import { userApi, accountsApi } from '@sloops/library-ui-data-wrappers';
import { Layouts } from '@sloops/library-ui-components';

const TeamListItemComponent = ({
  teamMember, // eslint-disable-line react/prop-types
  cancelInvitation, // eslint-disable-line react/prop-types
  toggleUserEnabledDisabled, // eslint-disable-line react/prop-types
}) => (
  <tr>
    <td>{teamMember.firstName} {teamMember.lastName}</td>
    <td>
      {
        teamMember.pendingInvitation
          ? 'pending'
          : teamMember.enabled
            ? 'active'
            : 'disabled'
      }
    </td>
    <td>
      {
        teamMember.pendingInvitation
          ? (
            <a
              onClick={async (e) => {
                e.preventDefault();
                const confirmed = confirm(`Are you sure you want to ${
                  teamMember.pendingInvitation
                    ? 'cancel the invitation'
                    : teamMember.enabled
                      ? 'disable this user'
                      : 'make this user active'
                }?`);
                if (confirmed) {
                  await (teamMember.pendingInvitation
                    ? cancelInvitation
                    : toggleUserEnabledDisabled
                  )({ userId: parseInt(teamMember.id, 10) });
                }
              }}
            >
              {
                teamMember.pendingInvitation
                  ? 'cancel invitation'
                  : teamMember.enabled
                    ? 'disable user'
                    : 'enable user'
              }
            </a>
          )
          : null
      }
    </td>
    <td><Link to={`/team-member/${teamMember.id}`}>Profile</Link></td>
  </tr>
);

const TeamListItem = compose(
  accountsApi.mutation.cancelInvitation,
  withProps(({ makeApiCall }) => ({ cancelInvitation: makeApiCall })),
  userApi.mutation.toggleUserEnabledDisabled,
  withProps(({ makeApiCall }) => ({ toggleUserEnabledDisabled: makeApiCall })),
)(TeamListItemComponent);

// eslint-disable-next-line react/prop-types
const TeamList = ({ teamList: { teamList, loading }, history, location }) => (
  <Layouts.SalesDashboardLayout history={history} location={location}>
    <h2>Team list</h2>
    { loading && <div>loading...</div> }
    <table style={{ width: '100%' }}>
      <thead>
        <tr style={{ textAlign: 'left' }}>
          <th>Full name</th>
          <th>Status</th>
          <th>Action</th>
          <th />
        </tr>
      </thead>
      <tbody>
        {
          teamList && teamList.map(teamMember => (<TeamListItem
            key={teamMember.id}
            teamMember={teamMember}
          />))
        }
      </tbody>
    </table>
  </Layouts.SalesDashboardLayout>
);

TeamList.propTypes = {
  history: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  location: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default userApi.query.teamList(TeamList);
