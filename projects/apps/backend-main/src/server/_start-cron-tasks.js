const startCronTasks = (databases, queues) => {
  queues.deleteExpiredInvitations.add({}, {
    repeat: {
      cron: '0 0 4 * * *', // 4am every day
      tz: process.env.TZ,
    },
  });
};

export default startCronTasks;
