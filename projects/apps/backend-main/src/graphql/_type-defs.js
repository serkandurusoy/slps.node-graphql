const typeDefs = [`

  scalar DateTime
  
  # address object
  type Address {
    lat: Float
    lng: Float
    number: String
    street: String
    area: String
    city: String
    zip: String
    state: String
    country: String
  }
  
  # user profile object
  type Profile {
    userId: Int!
    address: Address
    phoneNumbers: [String!]
  }
  
  # basic user object
  type User {
    id: Int!
    email: String!
    enabled: Boolean!
    isAdministrator: Boolean!
    isSalesManager: Boolean!
    isSalesRepresentative: Boolean!
    isRetailerAdministrator: Boolean!
    isRetailer: Boolean!
    isCustomer: Boolean!
    business: String!
    emailVerified: Boolean!
    firstName: String!
    lastName: String!
    pendingInvitation: String!
    manager: Int
    createdAt: DateTime!
    activatedAt: DateTime
    profile: Profile
  }
  
  # opening hours object
  type OpeningHours {
    open: Boolean
    day: String!
    openingHour: String!
    closingHour: String!
  }
  
  # basic business/shop object
  type Business {
    _id: String!
    userId: String!
    logo: String
    name: String!
    description: String
    categories: [String!]!
    storeType: String!
    phoneNumber: String!
    address: Address!
    openingHours: [OpeningHours!]!
    pictures: [String]
    createdAt: DateTime!
  }
  
  # decodable jwt token with embedded user id
  type Token {
    token: String!
  }

  type httpBasicAuthResponse {
    authenticated: Boolean
    rejected: Boolean
  }

  type registerAsRetailerResponse {
    token: String!
    welcomeEmailSent: Boolean!
  }

  type acceptInvitationResponse {
    token: String!
    welcomeEmailSent: Boolean!
  }
  
  type getSignedUploadUrlResponse {
      uploadUrl: String!
      downloadUrl: String!
    }

  type Query {
    # information about the current user
    me(userId: Int): User

    # information about given user
    user(userId: Int): User

    # list of users
    users: [User!]!

    # list of team members for current sales manager
    teamList: [User!]!

    # information about an invited user
    retrieveInvitation(pendingInvitation: String!): User

    # information about given business
    business(businessId: String): Business

    # information about the current user's business
    myBusiness: Business
  }
  
  # hashed password input
  input Password {
    digest: String!
    algorithm: String!
  }
  
  input Invitation {
    firstName: String!
    lastName: String!
    email: String!
  }
  
  input OpeningHoursInput {
    open: Boolean
    day: String!
    openingHour: String!
    closingHour: String!
  }
  
  input AddressInput {
    lat: Float!
    lng: Float!
    number: String!
    street: String
    area: String
    city: String
    zip: String
    state: String
    country: String!
  }
  
  input BusinessDoc {
    logo: String
    name: String!
    description: String
    categories: [String!]!
    phoneNumber: String!
    address: AddressInput!
    openingHours: [OpeningHoursInput!]!
    pictures: [String]
  }
  
  type Mutation {
    # basic password login
    httpBasicAuth(password: Password!): httpBasicAuthResponse!

    # generate login token
    login(email: String!, password: Password!): Token!
    
    # generate password reset link
    forgotPassword(email: String!): Boolean!
    
    # reset password
    resetPassword(password: Password!, resetToken: String!): Token!
    
    # change password
    changePassword(oldPassword: Password!, newPassword: Password!): Boolean!
    
    # register as a new retailer
    registerAsRetailer(firstName: String!, lastName: String!, address: AddressInput, email: String!, password: Password!): registerAsRetailerResponse!
    
    # update account settings
    updateAccountSettings(firstName: String!, lastName: String!, email: String!, phoneNumbers: [String!]!, address: AddressInput!): Boolean!
    
    # refresh existing login token
    refreshToken(token: String!): Token!
    
    # toggle a user's enabled status
    toggleUserEnabledDisabled(userId: Int!): Boolean!

    # change a team's manager
    reassignTeamManager(oldManagerId: Int!, newManagerId: Int!): Boolean!

    # send a new invitation
    sendInvitations(invitations: [Invitation!]!, role: String!, manager: Int): Boolean!

    # cancel a user's pending invitation
    cancelInvitation(userId: Int!): Boolean!

    # accept a pending invitation
    acceptInvitation(firstName: String!, lastName: String!, address: AddressInput, password: Password!, pendingInvitation: String!): acceptInvitationResponse!

    # insert or update a business
    updateMyBusiness(business: BusinessDoc!): String!
    
    # create a google signed url for file uploads
    getSignedUploadUrl(fileName: String!, fileType: String!, targetType: String!, targetArgs: [String!]): getSignedUploadUrlResponse!
  }

  schema {
    query: Query
    mutation: Mutation
  }
`];

export default typeDefs;
