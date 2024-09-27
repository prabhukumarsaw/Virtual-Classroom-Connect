// services/socketService/socketHandler.js
const { Room } = require('../../models/Room'); // Import your Room model

module.exports = (io) => {
  io.on('connection', (socket) => {
    let isActive = true;

    // Handle user joining a room
    socket.on('joinRoom', async ({ roomId, userId }) => {
      console.log(`${userId} is joining room: ${roomId}`);
      
      socket.join(roomId);
      socket.userId = userId;
      socket.roomId = roomId;

      const room = await Room.findById(roomId);
      if (room) {
        // Add user to room participants if not already present
        if (!room.participants.includes(userId)) {
          room.participants.push(userId);
          await room.save();
        }
      }

      console.log(`${userId} joined room: ${roomId}`);
    });

    // Handle user activity to keep them connected
    socket.on('userActivity', () => {
      isActive = true; // Reset activity flag on activity
      console.log(`User ${socket.userId} is active.`);
    });

    // Interval to check user activity every minute
    const activityCheckInterval = setInterval(() => {
      if (!isActive) {
        console.log(`User ${socket.userId} is inactive.`);
        socket.disconnect(true); // Disconnect user if inactive
      } else {
        isActive = false; // Reset the flag for the next check
      }
    }, 60000); // Check every 60 seconds

    // Handle user disconnecting (browser closed, lost connection)
    socket.on('disconnect', async () => {
      clearInterval(activityCheckInterval); // Clear the interval for activity checking

      const userId = socket.userId;
      const roomId = socket.roomId;
      
      if (userId && roomId) {
        const room = await Room.findById(roomId);
        if (room) {
          // Remove the user from the room participants
          room.participants = room.participants.filter(participant => participant.toString() !== userId.toString());
          await room.save();

          console.log(`${userId} removed from room: ${roomId}`);
          
          // If no participants are left in the room, schedule room deletion
          if (room.participants.length === 0) {
            room.scheduleDeletionIfEmpty(); // Schedule room deletion if it's empty
          }
        }
      }
    });
  });
};
