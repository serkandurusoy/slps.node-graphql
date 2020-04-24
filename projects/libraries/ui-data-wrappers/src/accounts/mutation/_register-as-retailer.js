import { hashPassword } from '@sloops/library-utils';
import { createMutationHoc } from '../../_util';
import { registerAsRetailer } from './_gql';

const mutation = createMutationHoc(
  registerAsRetailer,
  {
    transformArgs: ({
      firstName,
      lastName,
      address,
      email,
      password,
    }) => ({
      variables: {
        firstName,
        lastName,
        address,
        email,
        password: hashPassword(password),
      },
    }),
    transformResult: data => ({
      ...(data && data.registerAsRetailer && {
        token: data.registerAsRetailer.token,
        welcomeEmailSent: data.registerAsRetailer.welcomeEmailSent,
      }),
    }),
  },
);

export default mutation;
