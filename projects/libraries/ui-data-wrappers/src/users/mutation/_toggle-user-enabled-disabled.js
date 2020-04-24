import { createMutationHoc } from '../../_util';
import { toggleUserEnabledDisabled } from './_gql';
import { userList, teamList } from '../query/_gql';

const mutation = createMutationHoc(
  toggleUserEnabledDisabled,
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
      toggled: data && data.toggleUserEnabledDisabled,
    }),
  },
);

export default mutation;
