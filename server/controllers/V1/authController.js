const { User } = require('../../models/User');
const asyncHandler = require('../../utils/asyncHandler');
const Joi = require('joi');
const { validateRegistration, validateLogin } = require('../../utils/validators');

// User registration
exports.registerUser = asyncHandler(async (req, res) => {
  const { error } = validateRegistration(req.body);
  if (error) {
    return res.status(400).json({
      success: false,
      message: 'Invalid registration data',
      error: error.details[0].message
    });
  }

  const { email, password, name } = req.body;

  // Check if the user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({
      success: false,
      message: 'User already exists'
    });
  }

  // Create and save the new user
  const user = new User({ email, password, name });
  await user.save();

  // Generate JWT token
  const token = user.generateAuthToken();

  res.status(201).json({
    success: true,
    token,
    user
  });
});

// User login
exports.loginUser = asyncHandler(async (req, res) => {
  const { error } = validateLogin(req.body);
  if (error) {
    return res.status(400).json({
      success: false,
      message: 'Invalid login data',
      error: error.details[0].message
    });
  }

  const { email, password } = req.body;

  // Check if the user exists and password matches
  const user = await User.findOne({ email });
  if (!user || !(await user.matchPassword(password))) {
    return res.status(401).json({
      success: false,
      message: 'Invalid credentials'
    });
  }

  // Generate JWT token
  const token = user.generateAuthToken();

  res.status(200).json({
    success: true,
    token,
    user
  });
});

// Get user profile (protected)
exports.getUserProfile = asyncHandler(async (req, res) => {
  const user = req.user; // user is set in passport.js middleware
  res.status(200).json({
    success: true,
    user
  });
});


// Logout user (protected)
exports.logoutUser = asyncHandler(async (req, res) => {
  // Clear the authentication token from the client-side
  // Assuming you have a way to clear the token or session on the client-side
  
  res.status(200).json({
    success: true,
    message: 'Successfully logged out'
  });
});