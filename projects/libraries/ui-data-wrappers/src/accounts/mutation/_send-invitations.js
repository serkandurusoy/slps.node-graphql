import { createMutationHoc } from '../../_util';
import { sendInvitations } from './_gql';
import { userList, teamList } from '../../users/query/_gql';

const mutation = createMutationHoc(
  sendInvitations,
  {
    transformArgs: ({ role, manager, invitations }) => ({
      variables: {
        invitations,
        role,
        manager,
      },
      refetchQueries: [
        {
          query: userList,
        },
        {
          query: teamList,
        },
      ],
    }),
    transformResult: data => ({
      invitationsSent: data && data.sendInvitations,
    }),
  },
);

export default mutation;
