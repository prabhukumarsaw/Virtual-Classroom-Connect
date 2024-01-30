const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  maxParticipants: {
    type: Number,
    required: true,
  },
  active: {
    type: Boolean,
    default: true, // Set the default value to true if the room is considered active by default
  },
  participants: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Assuming you have a User model, adjust this based on your user model
      },
      fullname: String,  // Add user name field
      imageUrl: String,
      username: String, // Add user image field (you can store the URL or any reference to the image)
    },
  ],
});

const Room = mongoose.model('Room', roomSchema);

module.exports = Room;
