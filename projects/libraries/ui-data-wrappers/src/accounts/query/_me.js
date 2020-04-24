import { graphql } from 'react-apollo';
import { me } from './_gql';

const query = WrappedComponent => graphql(me, {
  options: props => ({
    variables: {
      userId: parseInt(props.userId, 10),
    },
    fetchPolicy: 'network-only',
  }),
  name: 'me',
  props: ({ ownProps: { appId }, me: data }) => { // eslint-disable-line no-unused-vars
    const isAllowed = data.me && data.me.enabled && (
      appId === 'admin'
        ? data.me.isAdministrator
        : appId === 'retailer'
          ? (data.me.isAdministrator || data.me.isRetailerAdministrator || data.me.isRetailer)
          : (data.me.isAdministrator || data.me.isSalesManager || data.me.isSalesRepresentative)
    );

    const isCoreAudience = data.me && data.me.enabled && (
      appId === 'admin'
        ? data.me.isAdministrator
        : appId === 'retailer'
          ? (data.me.isRetailerAdministrator || data.me.isRetailer)
          : (data.me.isSalesManager || data.me.isSalesRepresentative)
    );

    const userProfileAsSalesRepresentativeCreated = data.me && (
      data.me.isSalesRepresentative
      && data.me.isAllowed
      && data.me.profile
      && data.me.profile.address
      && data.me.profile.address.lat
      && data.me.profile.address.lng
      && data.me.profile.address.number
      && data.me.profile.address.country
      && data.me.profile.phoneNumbers
      && data.me.profile.phoneNumbers.length
    );

    const hasBusiness = data.me && data.me.enabled && !!data.me.business;

    return {
      me: {
        ...data,
        me: data.me ? {
          appId,
          ...data.me,
          hasBusiness,
          isAllowed,
          isCoreAudience,
          userProfileAsSalesRepresentativeCreated,
        } : {},
      },
    };
  },
})(WrappedComponent);

export default query;
