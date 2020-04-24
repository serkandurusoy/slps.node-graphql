const findByManager = async ({ manager }, { mysql }) => {
  const users = await mysql
    .select('*')
    .from('users')
    .where({
      isSalesRepresentative: true,
      manager,
    });
  return users;
};

export default findByManager;
