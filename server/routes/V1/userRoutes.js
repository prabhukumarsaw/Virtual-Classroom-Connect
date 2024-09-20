const express = require('express');
const {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend,
  updateOnlineStatus
} = require('../../controllers/V1/userController');
const { protect } = require('../../middleware/authMiddleware'); // Import the protect middleware

const router = express.Router();

// Route to get all users (protected)
router.get('/users', protect, getAllUsers);

// Route to get a single user by ID (protected)
router.get('/users/:id', protect, getUserById);

// Route to update a user by ID (protected)
router.put('/users/:id', protect, updateUser);

// Route to delete a user by ID (protected)
router.delete('/users/:id', protect, deleteUser);

// Route to add a friend (protected)
router.post('/users/friends', protect, addFriend);

// Route to remove a friend (protected)
router.delete('/users/friends', protect, removeFriend);

// Route to update online status (protected)
router.put('/users/online-status', protect, updateOnlineStatus);

module.exports = router;
