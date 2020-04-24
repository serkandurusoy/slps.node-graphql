const insert = async (business, { mongodb }) => {
  try {
    const result = await mongodb.collection('businesses').insertOne(business);
    // eslint-disable-next-line no-underscore-dangle
    return result && result.insertedId.toString();
  } catch (error) {
    throw error;
  }
};

export default insert;
