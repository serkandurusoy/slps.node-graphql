import { graphql } from 'react-apollo';
import { userProfile } from './_gql';

const query = WrappedComponent => graphql(userProfile, {
  options: props => ({
    variables: {
      userId: parseInt(props.fetchProfileForUserId, 10),
    },
    fetchPolicy: 'network-only',
  }),
  name: 'userProfile',
})(WrappedComponent);

export default query;
