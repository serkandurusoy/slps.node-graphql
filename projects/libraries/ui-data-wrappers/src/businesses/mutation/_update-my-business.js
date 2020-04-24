import { createMutationHoc } from '../../_util';
import { updateMyBusiness } from './_gql';
import { myBusiness } from '../query/_gql';

const mutation = createMutationHoc(
  updateMyBusiness,
  {
    transformArgs: ({ business }) => ({
      variables: {
        business,
      },
      refetchQueries: [
        {
          query: myBusiness,
        },
      ],
    }),
    transformResult: data => ({
      businessUpdated: data && data.updateMyBusiness,
    }),
  },
);

export default mutation;
