import { createMutationHoc } from '../../_util';
import { reassignTeamManager } from './_gql';
import { userList, teamList } from '../query/_gql';

const mutation = createMutationHoc(
  reassignTeamManager,
  {
    transformArgs: ({ oldManagerId, newManagerId }) => ({
      variables: {
        oldManagerId,
        newManagerId,
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
      reassigned: data && data.reassignTeamManager,
    }),
  },
);

export default mutation;
