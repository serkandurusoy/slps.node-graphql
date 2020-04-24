import { ObjectID } from 'mongodb';

const findById = async ({ businessId }, { mongodb }) => {
  if (businessId) {
    try {
      const doc = await mongodb.collection('businesses').findOne({
        _id: new ObjectID(businessId),
      });
      return doc && {
        ...doc,
        _id: doc._id.toString(), // eslint-disable-line no-underscore-dangle
      };
    } catch (error) {
      throw error;
    }
  } else {
    return null;
  }
};

export default findById;
