import { createMutationHoc } from '../../_util';
import { updateAccountSettings } from './_gql';
import { me } from '../query/_gql';
import { teamList, userList } from '../../users/query/_gql';

const mutation = createMutationHoc(
  updateAccountSettings,
  {
    transformArgs: ({
      firstName,
      lastName,
      email,
      phoneNumbers,
      address,
    }) => ({
      variables: {
        firstName,
        lastName,
        email,
        phoneNumbers,
        address,
      },
      refetchQueries: [
        {
          query: me,
        },
        {
          query: userList,
        },
        {
          query: teamList,
        },
      ],
    }),
    transformResult: data => ({
      accountSettingsUpdated: data && data.updateAccountSettings,
    }),
  },
);

export default mutation;
