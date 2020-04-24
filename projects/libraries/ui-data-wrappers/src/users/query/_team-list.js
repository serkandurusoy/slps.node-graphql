import { graphql } from 'react-apollo';
import { teamList } from './_gql';

const query = WrappedComponent => graphql(teamList, {
  options: {
    fetchPolicy: 'network-only',
  },
  name: 'teamList',
})(WrappedComponent);

export default query;
