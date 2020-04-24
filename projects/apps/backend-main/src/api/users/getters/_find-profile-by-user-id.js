const findProfileByUserId = async ({ userId }, { mongodb }) => {
  try {
    const doc = await mongodb.collection('userProfiles').findOne({
      userId,
    });
    return doc && {
      ...doc,
      _id: doc._id.toString(), // eslint-disable-line no-underscore-dangle
    };
  } catch (error) {
    throw error;
  }
};

export default findProfileByUserId;
