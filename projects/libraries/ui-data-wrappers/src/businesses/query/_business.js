import { graphql } from 'react-apollo';
import { business } from './_gql';

const query = WrappedComponent => graphql(business, {
  options: props => ({
    variables: {
      businessId: props.match.params.businessId,
    },
    fetchPolicy: 'network-only',
  }),
  name: 'business',
})(WrappedComponent);

export default query;
