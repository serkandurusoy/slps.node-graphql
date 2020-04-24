const findById = async ({ id }, { mysql }) => {
  const users = await mysql
    .select('*')
    .from('users')
    .where('id', id);
  return users[0];
};

export default findById;
