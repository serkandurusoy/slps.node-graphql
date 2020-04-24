const reassignTeamManager = async ({ oldManagerId, newManagerId }, databases) => {
  try {
    const updatedCount = await databases.mysql('users')
      .where('manager', oldManagerId)
      .update({ manager: newManagerId });
    return updatedCount;
  } catch (error) {
    throw error;
  }
};

export default reassignTeamManager;
