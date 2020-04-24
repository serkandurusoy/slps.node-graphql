import { graphql } from 'react-apollo';
import { userList } from './_gql';

const query = WrappedComponent => graphql(userList, {
  options: {
    fetchPolicy: 'network-only',
  },
  name: 'userList',
})(WrappedComponent);

export default query;
