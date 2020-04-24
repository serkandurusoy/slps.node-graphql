import updateProfileByUserId from './_update-profile-by-user-id';

const updateById = async ({ id, doc }, databases) => {
  const {
    profile,
    ...userDoc
  } = doc;
  try {
    let updatedCount;
    if (userDoc && Object.keys(userDoc).length) {
      updatedCount = await databases.mysql('users')
        .where('id', id)
        .update(userDoc);
    }
    let profileId;
    if (profile && Object.keys(profile).length) {
      try {
        profileId = await updateProfileByUserId({
          userId: id,
          userProfile: profile,
        }, databases);
      } catch (error) {
        console.log('Error updating user profile object', error);
        throw error;
      }
    }

    return updatedCount === 1
      ? 1
      : profileId
        ? 1
        : -1;
  } catch (error) {
    throw error;
  }
};

export default updateById;
