const removeById = async ({ id }, { mysql }) => {
  try {
    const result = await mysql('users')
      .where('id', id)
      .del();
    return result;
  } catch (error) {
    throw error;
  }
};

export default removeById;
