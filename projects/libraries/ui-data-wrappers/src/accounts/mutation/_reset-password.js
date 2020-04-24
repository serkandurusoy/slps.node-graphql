import { hashPassword } from '@sloops/library-utils';
import { createMutationHoc } from '../../_util';
import { resetPassword } from './_gql';

const mutation = createMutationHoc(
  resetPassword,
  {
    transformArgs: ({ password, resetToken }) => ({
      variables: {
        resetToken,
        password: hashPassword(password),
      },
    }),
    transformResult: data => ({
      token: data && data.resetPassword && data.resetPassword.token,
    }),
  },
);

export default mutation;
