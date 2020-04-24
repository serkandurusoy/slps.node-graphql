import { hashPassword } from '@sloops/library-utils';
import { createMutationHoc } from '../../_util';
import { acceptInvitation } from './_gql';

const mutation = createMutationHoc(
  acceptInvitation,
  {
    transformArgs: ({
      firstName,
      lastName,
      address,
      password,
      pendingInvitation,
    }) => ({
      variables: {
        firstName,
        lastName,
        address,
        password: hashPassword(password),
        pendingInvitation,
      },
    }),
    transformResult: data => ({
      ...(data && data.acceptInvitation && {
        token: data.acceptInvitation.token,
        welcomeEmailSent: data.acceptInvitation.welcomeEmailSent,
      }),
    }),
  },
);

export default mutation;
