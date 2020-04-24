import { gql } from 'react-apollo';

export const userProfile = gql`
  query userProfile($userId: Int) {
    user(userId: $userId) {
      id
      firstName
      lastName
      email
      activatedAt
      enabled
      pendingInvitation
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

export const userList = gql`
  query userList {
    users {
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

export const teamList = gql`
  query teamList {
    teamList {
      id
      enabled
      pendingInvitation
      firstName
      lastName
    }
  }
`;
