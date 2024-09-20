const { Room } = require('../../models/Room');
const { User } = require('../../models/User');
const asyncHandler = require('../../utils/asyncHandler');
const { validateRoomCreation, validateRoomJoin, validateMessage } = require('../../utils/validators');

// Create a new room
exports.createRoom = asyncHandler(async (req, res) => {
  const { title, description, theme, roomType, passcode, maxParticipants } = req.body;
  const owner = req.user._id;

  // Validation
  const { error } = validateRoomCreation({ title, description, theme, roomType, passcode, maxParticipants });
  if (error) return res.status(400).json({ success: false, message: error.message });

  // Create the room
  const room = new Room({ title, description, theme, roomType, passcode, maxParticipants, owner, participants: [owner] });
  await room.save();

  res.status(201).json({ success: true, room });
});


// Join a room
exports.joinRoom = asyncHandler(async (req, res) => {
  const { roomId } = req.params;
  const userId = req.user._id;
  const { passcode } = req.body;

  // Validation
  const { error } = validateRoomJoin({ roomId });
  if (error) return res.status(400).json({ success: false, message: error.message });

  // Find the room
  const room = await Room.findById(roomId).select('+passcode');
  if (!room) return res.status(404).json({ success: false, message: 'Room not found' });

  // Validate passcode if room is private
  if (room.roomType === 'private' && !(await room.validatePasscode(passcode))) {
    return res.status(403).json({ success: false, message: 'Invalid passcode' });
  }

  // Check if the user is already a participant
  if (room.participants.includes(userId)) {
    return res.status(400).json({ success: false, message: 'Already a member of this room' });
  }

  // Add user to room
  room.participants.push(userId);
  await room.save();

  res.status(200).json({ success: true, room });
});

// Get list of rooms
exports.getRooms = asyncHandler(async (req, res) => {
  const rooms = await Room.find()
    .populate('owner', 'name email profileImage bannerImage'); // Populate owner field with name and email

  res.status(200).json({ success: true, rooms });
});


// Get room details by ID
exports.getRoomById = asyncHandler(async (req, res) => {
  const { roomId } = req.params;

  const room = await Room.findById(roomId).populate('participants', 'name email');
  if (!room) return res.status(404).json({ success: false, message: 'Room not found' });

  res.status(200).json({ success: true, room });
});

// Send a message in a room
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

  // Add message to room
  room.messages.push({ user: userId, text });
  await room.save();

  res.status(200).json({ success: true, message: 'Message sent successfully' });
});
