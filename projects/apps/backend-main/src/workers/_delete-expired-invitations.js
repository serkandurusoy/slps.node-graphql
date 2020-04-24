const deleteExpiredInvitations = databases => async (job) => {
  try {
    await job.progress(0);
    const deleteMany = await databases.mongodb.collection('passwordResetTokens').deleteMany({
      expires: {
        $lte: new Date(),
      },
    });
    await job.progress(100);
    return deleteMany && deleteMany.deletedCount;
  } catch (error) {
    throw error;
  }
};

export default deleteExpiredInvitations;
