const { User } = require('../../models/User');
const asyncHandler = require('../../utils/asyncHandler');
const Joi = require('joi');
const { validateUpdateUser } = require('../../utils/validators');

// Get all users
exports.getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find().select('-password'); // Exclude password from results
  res.status(200).json({
    success: true,
    users
  });
});

// Get a single user by ID
exports.getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select('-password'); // Exclude password from results
  if (!user) {
    return res.status(404).json({
      success: false,
      message: 'User not found'
    });
  }
  res.status(200).json({
    success: true,
    user
  });
});

// Update user by ID
exports.updateUser = asyncHandler(async (req, res) => {
  const { error } = validateUpdateUser(req.body);
  if (error) {
    return res.status(400).json({
      success: false,
      message: 'Invalid update data',
      error: error.details[0].message
    });
  }

  const user = await User.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true, runValidators: true } // Return the updated user and validate fields
  ).select('-password'); // Exclude password from results

  if (!user) {
    return res.status(404).json({
      success: false,
      message: 'User not found'
    });
  }

  res.status(200).json({
    success: true,
    user
  });
});

// Delete user by ID
exports.deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findByIdAndDelete(req.params.id);

  if (!user) {
    return res.status(404).json({
      success: false,
      message: 'User not found'
    });
  }

  res.status(200).json({
    success: true,
    message: 'User deleted successfully'
  });
});

// Add a friend
exports.addFriend = asyncHandler(async (req, res) => {
  const { userId, friendId } = req.body;

  if (!userId || !friendId) {
    return res.status(400).json({
      success: false,
      message: 'User ID and Friend ID are required'
    });
  }

  const user = await User.findById(userId);
  const friend = await User.findById(friendId);

  if (!user || !friend) {
    return res.status(404).json({
      success: false,
      message: 'User or Friend not found'
    });
  }

  if (user.friends.includes(friendId)) {
    return res.status(400).json({
      success: false,
      message: 'Already friends'
    });
  }

  user.friends.push(friendId);
  await user.save();

  friend.friends.push(userId);
  await friend.save();

  res.status(200).json({
    success: true,
    message: 'Friend added successfully',
    user
  });
});

// Remove a friend
exports.removeFriend = asyncHandler(async (req, res) => {
  const { userId, friendId } = req.body;

  if (!userId || !friendId) {
    return res.status(400).json({
      success: false,
      message: 'User ID and Friend ID are required'
    });
  }

  const user = await User.findById(userId);
  const friend = await User.findById(friendId);

  if (!user || !friend) {
    return res.status(404).json({
      success: false,
      message: 'User or Friend not found'
    });
  }

  if (!user.friends.includes(friendId)) {
    return res.status(400).json({
      success: false,
      message: 'Not friends'
    });
  }

  user.friends.pull(friendId);
  await user.save();

  friend.friends.pull(userId);
  await friend.save();

  res.status(200).json({
    success: true,
    message: 'Friend removed successfully',
    user
  });
});

// Update online status
exports.updateOnlineStatus = asyncHandler(async (req, res) => {
  const { userId, isOnline } = req.body;

  if (typeof isOnline !== 'boolean' || !userId) {
    return res.status(400).json({
      success: false,
      message: 'Invalid data'
    });
  }

  const user = await User.findById(userId);

  if (!user) {
    return res.status(404).json({
      success: false,
      message: 'User not found'
    });
  }

  user.isOnline = isOnline;
  await user.save();

  res.status(200).json({
    success: true,
    message: 'Online status updated',
    user
  });
});
