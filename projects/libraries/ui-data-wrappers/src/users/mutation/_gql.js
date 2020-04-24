import { gql } from 'react-apollo';

export const toggleUserEnabledDisabled = gql`
  mutation toggleUserEnabledDisabled($userId: Int!) {
    toggleUserEnabledDisabled(userId: $userId)
  }
`;

export const reassignTeamManager = gql`
  mutation reassignTeamManager($oldManagerId: Int!, $newManagerId: Int!) {
    reassignTeamManager(oldManagerId: $oldManagerId, newManagerId: $newManagerId)
  }
`;
