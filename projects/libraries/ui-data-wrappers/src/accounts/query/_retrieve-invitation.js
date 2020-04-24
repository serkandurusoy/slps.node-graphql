import { graphql } from 'react-apollo';
import { retrieveInvitation } from './_gql';

const query = WrappedComponent => graphql(
  retrieveInvitation,
  {
    options: props => ({
      variables: {
        pendingInvitation: props.match.params.pendingInvitation,
      },
      fetchPolicy: 'network-only',
    }),
    name: 'retrieveInvitation',
  },
)(WrappedComponent);

export default query;
