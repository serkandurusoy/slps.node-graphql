const findByPendingInvitation = async ({ pendingInvitation }, { mysql }) => {
  const users = await mysql
    .select('*')
    .from('users')
    .where('pendingInvitation', pendingInvitation);
  return users[0];
};

export default findByPendingInvitation;
