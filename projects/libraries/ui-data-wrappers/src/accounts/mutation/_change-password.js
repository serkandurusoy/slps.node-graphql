import { hashPassword } from '@sloops/library-utils';
import { createMutationHoc } from '../../_util';
import { changePassword } from './_gql';

const mutation = createMutationHoc(
  changePassword,
  {
    transformArgs: ({ oldPassword, newPassword }) => {
      const hashedOldPassword = hashPassword(oldPassword);
      const hashedNewPassword = hashPassword(newPassword);
      return {
        variables: {
          oldPassword: hashedOldPassword,
          newPassword: hashedNewPassword,
        },
      };
    },
    transformResult: data => ({
      passwordChanged: data && data.changePassword,
    }),
  },
);

export default mutation;
