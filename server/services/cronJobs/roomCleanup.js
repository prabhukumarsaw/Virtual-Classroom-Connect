const cron = require('node-cron');

const roomCleanupJob = () => {
  cron.schedule('*/10 * * * *', async () => {
    const inactiveRooms = await Room.find({ isActive: false, participants: { $size: 0 } });
    if (inactiveRooms.length > 0) {
      console.log(`Deleting ${inactiveRooms.length} inactive rooms.`);
      await Room.deleteMany({ _id: { $in: inactiveRooms.map(r => r._id) } });
    }
  });
};

module.exports = roomCleanupJob;
