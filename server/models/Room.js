const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');

const roomSchema = new mongoose.Schema({
  roomId: {
    type: String,
    unique: true,
    default: uuidv4,
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
    required: function () {
      return this.roomType === 'private';
    },
    select: false,
  },
  participants: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  maxParticipants: {
    type: Number,
    required: true,
    min: [2, 'At least 2 participants required'],
    max: [100, 'Cannot exceed 100 participants'],
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
  },
}, {
  timestamps: true,
});

// Pre-save passcode hashing
roomSchema.pre('save', async function (next) {
  if (this.isModified('passcode') && this.roomType === 'private') {
    const salt = await bcrypt.genSalt(10);
    this.passcode = await bcrypt.hash(this.passcode, salt);
  }
  next();
});

// Validate passcode for private rooms
roomSchema.methods.validatePasscode = async function (enteredPasscode) {
  return bcrypt.compare(enteredPasscode, this.passcode);
};

// Add participant method
roomSchema.methods.addParticipant = async function (userId) {
  if (!this.participants.includes(userId)) {
    this.participants.push(userId);
    await this.save();
    this.scheduleDeletionIfEmpty(); // Reschedule deletion timer if necessary
  } else {
    console.log(`User ${userId} is already a participant.`);
  }
};



// Remove participant method
roomSchema.methods.removeParticipant = async function (userId) {
  this.participants = this.participants.filter(participant => participant.toString() !== userId.toString());
  await this.save();
  this.scheduleDeletionIfEmpty(); // Check if deletion should be scheduled
};

const roomDeleteTimers = {};

// Schedule deletion if room is empty
roomSchema.methods.scheduleDeletionIfEmpty = function () {
  const room = this;

  if (room.participants.length === 0) {
    clearTimeout(roomDeleteTimers[room._id]);
    roomDeleteTimers[room._id] = setTimeout(async () => {
      const currentRoom = await Room.findById(room._id);
      if (currentRoom && currentRoom.participants.length === 0) {
        await Room.deleteOne({ _id: room._id });
        console.log(`Room ${room._id} deleted due to inactivity.`);
      }
    }, 120000); // 2 minutes delay
  }
};

// Post-save hook to trigger room deletion if empty
roomSchema.post('save', function (room) {
  room.scheduleDeletionIfEmpty();
});

const Room = mongoose.model('Room', roomSchema);
module.exports = { Room };
