const express = require('express');
const {
  createRoom,
  joinRoom,
  getRooms,
  sendMessage,
  getRoomById
} = require('../../controllers/V1/roomController');
const { protect } = require('../../middleware/authMiddleware');
const router = express.Router();

// Create a new room
router.post('/rooms', protect, createRoom);

// Join a room
router.post('/rooms/:roomId/join', protect, joinRoom);

// Get list of rooms
router.get('/rooms', protect, getRooms);

// Get room details by ID
router.get('/rooms/:roomId', protect, getRoomById);

// Send a message in a room
router.post('/rooms/:roomId/messages', protect, sendMessage);

module.exports = router;
