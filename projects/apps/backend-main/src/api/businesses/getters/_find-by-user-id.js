const findByUserId = async ({ userId }, { mongodb }) => {
  try {
    const doc = await mongodb.collection('businesses').findOne({
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

export default findByUserId;
