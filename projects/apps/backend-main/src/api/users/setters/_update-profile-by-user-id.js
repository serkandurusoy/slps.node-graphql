const updateProfileByUserId = async ({
  userId,
  userProfile,
}, { mongodb }) => {
  try {
    const upsert = await mongodb.collection('userProfiles').updateOne({
      userId,
    }, {
      $set: userProfile,
    }, {
      upsert: true,
    });
    // eslint-disable-next-line no-underscore-dangle
    return upsert && upsert.upsertedId && upsert.upsertedId._id.toString();
  } catch (error) {
    throw error;
  }
};

export default updateProfileByUserId;
