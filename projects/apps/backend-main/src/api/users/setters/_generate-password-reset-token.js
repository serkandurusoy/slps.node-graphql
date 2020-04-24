const generatePasswordResetToken = async ({
  email,
  appId,
  userId,
}, { mongodb }) => {
  try {
    const upsert = await mongodb.collection('passwordResetTokens').updateOne({
      userId,
    }, {
      $set: {
        userId,
        email,
        appId,
        expires: new Date(Date.now() + (24 * 60 * 60 * 1000)),
      },
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

export default generatePasswordResetToken;
