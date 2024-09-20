const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid'); // To generate unique roomId

const roomSchema = new mongoose.Schema({
  roomId: {
    type: String,
    unique: true,
    default: () => uuidv4(), // Generate a unique roomId for each room
  },
  title: {
    type: String,
    required: [true, 'Room title is required'],
    trim: true,
    maxlength: [100, 'Room title cannot exceed 100 characters'],
  },
  description: {
    type: String,
    trim: true,
    maxlength: [500, 'Description cannot exceed 500 characters'],
  },
  theme: [String],
  roomType: {
    type: String,
    enum: ['public', 'private'],
    default: 'public',
  },
  passcode: {
    type: String,
    required: function() {
      return this.roomType === 'private'; // Passcode required only for private rooms
    },
    select: false, // Do not include the passcode by default in queries
  },
  participants: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }],
  maxParticipants: {
    type: Number,
    required: [true, 'Number of participants is required'],
    min: [0, 'At least 2 participants are required'],
    max: [100, 'Room cannot exceed 100 participants'],
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
  }
}, {
  timestamps: true, // Automatically add `createdAt` and `updatedAt`
});

// Pre-save hook to handle passcode hashing for private rooms
roomSchema.pre('save', async function(next) {
  if (this.isModified('passcode') && this.roomType === 'private') {
    const salt = await bcrypt.genSalt(10); // Generate salt using bcryptjs
    this.passcode = await bcrypt.hash(this.passcode, salt); // Hash the passcode
  }
  next();
});

// Method to validate passcode for private rooms
roomSchema.methods.validatePasscode = async function(enteredPasscode) {
  return await bcrypt.compare(enteredPasscode, this.passcode); // Compare passcodes using bcryptjs
};

const Room = mongoose.model('Room', roomSchema);

module.exports = { Room };
