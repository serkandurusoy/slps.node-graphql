const hasRole = async ({ id, role }, { mysql }) => {
  const users = await mysql
    .select(role)
    .from('users')
    .where('id', id);
  const user = users[0];
  return !!(user && user[role]);
};

export default hasRole;
