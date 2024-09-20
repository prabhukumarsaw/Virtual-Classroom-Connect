const express = require('express');
const { registerUser, loginUser, getUserProfile, logoutUser } = require('../../controllers/V1/authController');
const { protect } = require('../../middleware/authMiddleware');
const router = express.Router();

// User registration
router.post('/register', registerUser);

// User login
router.post('/login', loginUser);

// Protected route for user profile
router.get('/profile', protect, getUserProfile);

// Route to log out the user
router.post('/logout', protect, logoutUser);


module.exports = router;
