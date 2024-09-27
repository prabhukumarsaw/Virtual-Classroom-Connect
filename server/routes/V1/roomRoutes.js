const express = require('express');
const {
  createRoom,
  joinRoom,
  getRooms,
  sendMessage,
  getRoomById,
  leaveRoom,
} = require('../../controllers/V1/roomController');
const { protect } = require('../../middleware/authMiddleware');

const router = express.Router();

// Room Routes
router.post('/rooms', protect, createRoom);          // Create room
router.post('/rooms/:roomId/join', protect, joinRoom); // Join room
router.get('/rooms', protect, getRooms);             // Get all rooms
router.get('/rooms/:roomId', protect, getRoomById);  // Get specific room
router.post('/rooms/:roomId/messages', protect, sendMessage); // Send message
router.delete('/rooms/:roomId/leave', protect, leaveRoom);    // Leave room

module.exports = router;
