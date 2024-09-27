const { Room } = require('../models/Room');

// Track the users and their room assignments
let usersInRooms = {};

module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log(`User connected: ${socket.id}`);

    // Join room event
    socket.on('joinRoom', async ({ roomId, userId }) => {
      try {
        const room = await Room.findOne({ roomId }).populate('participants');

        if (!room) {
          console.log(`Room not found for ID: ${roomId}`);
          return socket.emit('error', { message: 'Room not found' });
        }

        // Check room access (private room logic)
        if (room.roomType === 'private' && !room.participants.some((p) => p._id.toString() === userId)) {
          console.log(`Unauthorized access attempt by User ID: ${userId} to Room ID: ${roomId}`);
          return socket.emit('error', { message: 'Unauthorized access to the room' });
        }

        // If the user is not already a participant, add them
        if (!room.participants.some((p) => p._id.toString() === userId)) {
          room.participants.push(userId);
          await room.save();
        }

        // Track the user's room and socket ID
        usersInRooms[socket.id] = { roomId, userId };

        // Join room in socket.io
        socket.join(roomId);
        console.log(`User ID: ${userId} joined Room ID: ${roomId}`);

        // Notify others
        const participantDetails = room.participants.map((p) => ({
          _id: p._id,
          name: p.name,
          email: p.email,
        }));

        io.to(roomId).emit('participantList', participantDetails);
        io.to(roomId).emit('userJoined', { userId });

      } catch (error) {
        console.error('Join room error:', error);
        socket.emit('error', { message: 'An error occurred while joining the room' });
      }
    });

    // Leave room event
    socket.on('leaveRoom', async ({ roomId, userId }) => {
      try {
        const room = await Room.findOne({ roomId });
        if (room) {
          room.participants = room.participants.filter((p) => p.toString() !== userId);
          await room.save();
          socket.leave(roomId);
          console.log(`User ID: ${userId} left Room ID: ${roomId}`);

          // Notify others
          io.to(roomId).emit('userLeft', { userId });
          io.to(roomId).emit('participantList', room.participants);
        }
      } catch (error) {
        console.error('Leave room error:', error);
      }
    });

    // Disconnect event (handle cases like closing the browser or losing connection)
    socket.on('disconnect', async () => {
      const userInfo = usersInRooms[socket.id];
      if (userInfo) {
        const { roomId, userId } = userInfo;
        console.log(`User ID: ${userId} disconnected from Room ID: ${roomId}`);

        // Remove the user from the room's participant list
        const room = await Room.findOne({ roomId });
        if (room) {
          room.participants = room.participants.filter((p) => p.toString() !== userId);
          await room.save();

          // Notify others in the room
          io.to(roomId).emit('userLeft', { userId });
          io.to(roomId).emit('participantList', room.participants);
        }

        // Clean up tracking data
        delete usersInRooms[socket.id];
      }

      console.log(`User disconnected: ${socket.id}`);
    });
  });
};
