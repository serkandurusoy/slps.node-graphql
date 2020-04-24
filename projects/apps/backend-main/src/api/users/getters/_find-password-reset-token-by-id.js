import { ObjectID } from 'mongodb';

const findPasswordResetTokenById = async ({ id }, { mongodb }) => {
  try {
    const doc = await mongodb.collection('passwordResetTokens').findOneAndDelete({
      _id: new ObjectID(id),
      expires: {
        $gte: new Date(),
      },
    });
    return doc && doc.value;
  } catch (error) {
    throw error;
  }
};

export default findPasswordResetTokenById;
