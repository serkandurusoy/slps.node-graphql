import { gql } from 'react-apollo';

export const me = gql`
  query me($userId: Int) {
    me(userId: $userId) {
      id
      email
      enabled
      isAdministrator
      isSalesManager
      isSalesRepresentative
      isRetailerAdministrator
      isRetailer
      isCustomer
      business
      emailVerified
      firstName
      lastName
      pendingInvitation
      manager
      createdAt
      activatedAt
      profile {
        address {
          lat
          lng
          number
          street
          area
          city
          zip
          state
          country
        }
        phoneNumbers
      }
    }
  }
`;

export const retrieveInvitation = gql`
  query retrieveInvitation ($pendingInvitation: String!) {
    retrieveInvitation(pendingInvitation: $pendingInvitation) {
      firstName,
      lastName,
      pendingInvitation,
    }
  }
`;
