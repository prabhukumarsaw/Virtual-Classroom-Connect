const { Room } = require('../../models/Room');
const { User } = require('../../models/User');
const asyncHandler = require('../../utils/asyncHandler');
const { validateRoomCreation, validateRoomJoin, validateMessage } = require('../../utils/validators');

// Create Room
exports.createRoom = asyncHandler(async (req, res) => {
  const { title, description, theme, roomType, passcode, maxParticipants } = req.body;
  const owner = req.user._id;

  // Validate input
  const { error } = validateRoomCreation({ title, description, theme, roomType, passcode, maxParticipants });
  if (error) return res.status(400).json({ success: false, message: error.message });

  // Create room
  const room = new Room({ title, description, theme, roomType, passcode, maxParticipants, owner });
  await room.save();

  res.status(201).json({ success: true, room });
});

// Join Room
exports.joinRoom = asyncHandler(async (req, res) => {
  const { roomId } = req.params;
  const userId = req.user._id;
  const { passcode } = req.body;

  console.log(`User ${userId} attempting to join room ${roomId}`);

  const room = await Room.findOne({ roomId }).select('+passcode');
  if (!room) return res.status(404).json({ success: false, message: 'Room not found' });

  // Check if already a participant
  if (room.participants.includes(userId)) {
    console.log(`User ${userId} is already a participant`);
    return res.status(400).json({ success: false, message: 'Already a participant' });
  }

  // Check room capacity
  if (room.maxParticipants && room.participants.length >= room.maxParticipants) {
    return res.status(403).json({ success: false, message: 'Room is full' });
  }

  // Private room validation
  if (room.roomType === 'private') {
    if (!passcode) return res.status(403).json({ success: false, message: 'Passcode required' });

    const isPasscodeValid = await room.validatePasscode(passcode);
    if (!isPasscodeValid) return res.status(403).json({ success: false, message: 'Invalid passcode' });
  }

  // Join room
  await room.addParticipant(userId); // Add participant
  res.status(200).json({ success: true, room });
});


// Get Rooms
exports.getRooms = asyncHandler(async (req, res) => {
  const rooms = await Room.find().populate('owner', 'name email profileImage bannerImage');
  res.status(200).json({ success: true, rooms });
});

// Get Room by roomId
exports.getRoomById = asyncHandler(async (req, res) => {
  const { roomId } = req.params; // Extract roomId from request parameters

  // Find the room using the roomId field
  const room = await Room.findOne({ roomId }) // Change to findOne
    .populate('participants', 'name email'); // Populate participants' names and emails

  // Check if the room exists
  if (!room) {
    return res.status(404).json({ success: false, message: 'Room not found' });
  }

  // Return the room details
  res.status(200).json({ success: true, room });
});


// Send Message
exports.sendMessage = asyncHandler(async (req, res) => {
  const { roomId } = req.params;
  const { text } = req.body;
  const userId = req.user._id;

  // Validation
  const { error } = validateMessage({ text });
  if (error) return res.status(400).json({ success: false, message: error.message });

  // Find the room
  const room = await Room.findById(roomId);
  if (!room) return res.status(404).json({ success: false, message: 'Room not found' });

  // Add message (you could implement a Message model for this)
  if (!room.messages) room.messages = [];
  room.messages.push({ user: userId, text });
  await room.save();

  res.status(200).json({ success: true, message: 'Message sent' });
});

// Leave Room
exports.leaveRoom = asyncHandler(async (req, res) => {
  const { roomId } = req.params;
  const userId = req.user._id;

  const room = await Room.findById(roomId);
  if (!room) return res.status(404).json({ success: false, message: 'Room not found' });

  // Remove user from participants
  await room.removeParticipant(userId); // Call the method to remove participant

  // Check if there are still participants left, if not delete room
  if (room.participants.length === 0) {
    await Room.deleteOne({ _id: room._id });
    console.log(`Room ${room._id} deleted due to inactivity.`);
  }

  return res.status(200).json({ success: true, message: 'Successfully left the room' });
});


