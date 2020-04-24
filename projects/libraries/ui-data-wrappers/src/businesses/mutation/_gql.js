import { gql } from 'react-apollo';

export const updateMyBusiness = gql`
  mutation updateMyBusiness($business: BusinessDoc!) {
    updateMyBusiness(business: $business)
  }
`;
