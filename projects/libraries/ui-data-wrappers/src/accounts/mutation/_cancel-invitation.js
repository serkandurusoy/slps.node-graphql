import { createMutationHoc } from '../../_util';
import { cancelInvitation } from './_gql';
import { userList, teamList } from '../../users/query/_gql';

const mutation = createMutationHoc(
  cancelInvitation,
  {
    transformArgs: ({ userId }) => ({
      variables: {
        userId,
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
      cancelled: data && data.cancelInvitation,
    }),
  },
);

export default mutation;
