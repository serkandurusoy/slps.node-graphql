import { gql } from 'react-apollo';

export const loginWithEmailAndPassword = gql`
  mutation loginWithEmailAndPassword($email: String!, $password: Password!) {
    login(email: $email, password: $password) {
      token,
    }
  }
`;

export const refreshToken = gql`
  mutation refreshToken($token: String!) {
    refreshToken(token: $token) {
      token,
    }
  }
`;

export const forgotPassword = gql`
  mutation forgotPassword($email: String!) {
    forgotPassword(email: $email)
  }
`;

export const resetPassword = gql`
  mutation resetPassword($password: Password!, $resetToken: String!) {
    resetPassword(password: $password, resetToken: $resetToken) {
      token,
    }
  }
`;

export const changePassword = gql`
  mutation changePassword($oldPassword: Password!, $newPassword: Password!) {
    changePassword(oldPassword: $oldPassword, newPassword: $newPassword)
  }
`;

export const updateAccountSettings = gql`
  mutation updateAccountSettings($firstName: String!, $lastName: String!, $email: String!, $phoneNumbers: [String!]!, $address: AddressInput!) {
    updateAccountSettings(firstName: $firstName, lastName: $lastName, email: $email, phoneNumbers: $phoneNumbers, address: $address)
  }
`;

export const sendInvitations = gql`
  mutation sendInvitations($invitations: [Invitation!]!, $role: String!, $manager: Int) {
    sendInvitations(invitations: $invitations, role: $role, manager: $manager)
  }
`;

export const cancelInvitation = gql`
  mutation cancelInvitation($userId: Int!) {
    cancelInvitation(userId: $userId)
  }
`;

export const acceptInvitation = gql`
  mutation acceptInvitation($firstName: String!, $lastName: String!, $address: AddressInput, $password: Password!, $pendingInvitation: String!) {
    acceptInvitation(firstName: $firstName, lastName: $lastName, address: $address, password: $password, pendingInvitation: $pendingInvitation) {
      token,
      welcomeEmailSent,
    }
  }
`;

export const registerAsRetailer = gql`
  mutation registerAsRetailer($firstName: String!, $lastName: String!, $address: AddressInput, $email: String!, $password: Password!) {
    registerAsRetailer(firstName: $firstName, lastName: $lastName, address: $address, email: $email, password: $password) {
      token,
      welcomeEmailSent,
    }
  }
`;

