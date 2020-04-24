const findByEmail = async ({ email }, { mysql }) => {
  const users = await mysql
    .select('*')
    .from('users')
    .where('email', email);
  return users[0];
};

export default findByEmail;
