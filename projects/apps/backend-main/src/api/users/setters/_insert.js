import updateProfileByUserId from './_update-profile-by-user-id';

const insert = async ({
  email,
  password,
  enabled,
  isAdministrator,
  isSalesManager,
  isSalesRepresentative,
  pendingInvitation,
  isRetailerAdministrator,
  isRetailer,
  isCustomer,
  business,
  emailVerified,
  firstName,
  lastName,
  manager,
  createdAt,
  activatedAt,
  profile,
}, databases) => {
  try {
    const ids = await databases.mysql
      .insert({
        email,
        password,
        enabled,
        isAdministrator,
        isSalesManager,
        isSalesRepresentative,
        pendingInvitation,
        isRetailerAdministrator,
        isRetailer,
        isCustomer,
        business,
        emailVerified,
        firstName,
        lastName,
        manager,
        createdAt,
        activatedAt,
      })
      .into('users');
    const id = ids[0];

    const userProfile = {
      userId: id,
      address: profile.address,
      phoneNumbers: profile.phoneNumbers,
    };

    let profileId;
    try {
      profileId = await updateProfileByUserId({
        userId: userProfile.userId,
        userProfile,
      }, databases);
    } catch (error) {
      console.log('Error creating user profile object', error);
    }

    const user = {
      id,
      email,
      password,
      enabled,
      isAdministrator,
      isSalesManager,
      isSalesRepresentative,
      pendingInvitation,
      isRetailerAdministrator,
      isRetailer,
      isCustomer,
      business,
      emailVerified,
      firstName,
      lastName,
      manager,
      createdAt,
      activatedAt,
      profile: profileId ? {
        _id: profileId,
        ...userProfile,
      } : { userId: id },
    };
    // TODO: implement caching with separated user and profile records
    // databases.redis.set(`database:mysql:user:${id}`, JSON.stringify(user));
    return user;
  } catch (error) {
    if (error.message.includes('ER_DUP_ENTRY')) throw new Error('Email address already registered');
    throw error;
  }
};

export default insert;
