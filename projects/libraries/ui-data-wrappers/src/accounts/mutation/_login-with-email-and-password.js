import { hashPassword } from '@sloops/library-utils';
import { createMutationHoc } from '../../_util';
import { loginWithEmailAndPassword } from './_gql';

const mutation = createMutationHoc(
  loginWithEmailAndPassword,
  {
    transformArgs: (email, password) => ({
      variables: {
        email,
        password: hashPassword(password),
      },
    }),
    transformResult: data => ({
      token: data && data.login && data.login.token,
    }),
  },
);

export default mutation;
