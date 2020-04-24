import { graphql } from 'react-apollo';
import { myBusiness } from './_gql';

const query = WrappedComponent => graphql(myBusiness, {
  options: {
    fetchPolicy: 'network-only',
  },
  name: 'myBusiness',
})(WrappedComponent);

export default query;
