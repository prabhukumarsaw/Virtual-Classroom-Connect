const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); // Updated to use bcryptjs
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    maxlength: [100, 'Name cannot exceed 100 characters'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    trim: true,
    lowercase: true,
    maxlength: [100, 'Email cannot exceed 100 characters'],
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters long'],
  },
  address: {
    type: String,
    trim: true,
  },
  country: {
    type: String,
    trim: true,
  },
  education: {
    type: String,
    trim: true,
  },
  interests: [String], // Simplified array definition
  designation: {
    type: String,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  profileImage: {
    type: String,
    trim: true,
  },
  bannerImage: {
    type: String,
    trim: true,
  },
  friendList: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }],
  notifications: [String],
  friendRequests: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }],
  chat: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Chat',
  }],
}, {
  timestamps: true, // Automatically add createdAt and updatedAt
});

// Hash the user's password before saving
userSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

// Method to compare password
userSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Generate JWT Token
userSchema.methods.generateAuthToken = function() {
  return jwt.sign({ _id: this._id, email: this.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

const User = mongoose.model('User', userSchema);

module.exports = { User };
