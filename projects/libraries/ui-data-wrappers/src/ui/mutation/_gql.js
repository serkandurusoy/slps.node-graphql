import { gql } from 'react-apollo';

export const httpBasicAuth = gql`
  mutation httpBasicAuth($password: Password!) {
    httpBasicAuth(password: $password) {
      authenticated
      rejected
    }
  }
`;

export const getSignedUploadUrl = gql`
  mutation getSignedUploadUrl($fileName: String!, $fileType: String!, $targetType: String!, $targetArgs: [String!]) {
    getSignedUploadUrl(fileName: $fileName, fileType: $fileType, targetType: $targetType, targetArgs: $targetArgs) {
      uploadUrl
      downloadUrl
    }
  }
`;
