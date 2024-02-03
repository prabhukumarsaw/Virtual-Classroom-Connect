const Room = require('../model/room-model');

module.exports = (socket, io) => {
  socket.on('joinRoom', async ({ roomId, userId }) => {
    socket.join(roomId);
    const room = await Room.findById(roomId);
    if (room) {
      room.participants.push(userId);
      await room.save();
      io.to(roomId).emit('updateParticipants', room.participants);
    }
  });

  socket.on('leaveRoom', async ({ roomId, userId }) => {
    socket.leave(roomId);
    const room = await Room.findById(roomId);
    if (room) {
      room.participants = room.participants.filter((id) => id !== userId);
      await room.save();
      io.to(roomId).emit('updateParticipants', room.participants);
    }
  });

  // Add other socket events as needed for video controls, etc.
};
