import { ObjectID } from 'mongodb';

const updateById = async ({ businessId, business }, { mongodb }) => {
  try {
    const upsert = await mongodb.collection('businesses').updateOne({
      _id: new ObjectID(businessId),
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

export default updateById;
