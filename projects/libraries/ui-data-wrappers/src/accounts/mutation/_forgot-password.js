import { createMutationHoc } from '../../_util';
import { forgotPassword } from './_gql';

const mutation = createMutationHoc(
  forgotPassword,
  {
    transformArgs: email => ({
      variables: {
        email,
      },
    }),
    transformResult: data => ({
      resetLinkSent: data && data.forgotPassword,
    }),
  },
);

export default mutation;
