const updateByUserId = async ({
  userId,
  business,
}, { mongodb }) => {
  try {
    const upsert = await mongodb.collection('businesses').updateOne({
      userId,
    }, {
      $set: business,
    }, {
      upsert: true,
    });
    /* eslint-disable no-underscore-dangle */
    return upsert && (
      (upsert.upsertedId && upsert.upsertedId._id.toString())
      || (upsert.matchedCount)
    );
  } catch (error) {
    throw error;
  }
};

export default updateByUserId;
