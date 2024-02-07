
const express = require('express');
const Room = require('../model/room-model'); // Adjust the path based on your project structure
const authenticateUser = require('../Middleware/authMiddleware');

//  router
const home = async (req, res) => {
  try {
    res.status(200).send("Welcome to Home Page");
  } catch (error) {
    console.log(error);
  }
};

const rooms = [];

// Route to create a new room
const createRoom =  async (req, res) => {
  const { roomName, roomDescription, selectedImage, maxParticipants } = req.body;

  try {
    console.log("Received request to create room:", req.body);

     // Ensure the selectedImage is one of the predefined options
   
    

    const newRoom = await Room.create({
      roomName,
      roomDescription,
      selectedImage,
      maxParticipants,// Assuming you have a middleware to attach the user to the request
      participants: [],
    });

    // Schedule room cleanup after 5 minutes if it's empty
    try {
      setTimeout(async () => {
        const roomToDelete = await Room.findByIdAndDelete(newRoom._id);
    
        if (roomToDelete) {
          console.log(`Room '${roomToDelete.roomName}' deleted due to inactivity.`);
        }
      }, 5 * 60 * 1000); // 5 minutes in milliseconds
    } catch (error) {
      console.error('Error creating room:', error);
    }

    res.status(200).json({ message: 'Room created successfully', room: newRoom });
  } catch (error) {
    if (error.name === 'ValidationError') {
      console.error("Validation Error:", error.errors);
      res.status(400).json({ error: 'Validation Error', details: error.errors });
    } else {
      console.error("Error creating room:", error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
};



// Route to get all rooms
const all = async (req, res) => {
  try {
    const rooms = await Room.find().populate('creator', 'name');

    // Implement logic to delete empty rooms after 5 minutes
    for (const room of rooms) {
      if (room.participants.length === 0 && room.createdAt) {
        const elapsedTime = Date.now() - room.createdAt.getTime();
        if (elapsedTime > 5 * 60 * 1000) { // 5 minutes in milliseconds
          const deletedRoom = await Room.findByIdAndDelete(room._id);
          if (deletedRoom) {
            console.log(`Room '${deletedRoom.roomName}' deleted due to inactivity.`);
          }
        }
      }
    }

    res.status(200).json({ rooms });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


// Route to get room details by ID
const joinRoom =  async (req, res) => {
  try {
    const roomId = req.params.roomId;

    // Retrieve room details by ID from the database
    const room = await Room.findById(roomId).populate('participants');

    if (!room) {
      return res.status(404).json({ message: 'Room not found' });
    }

    res.status(200).json(room);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Export the router
module.exports = {home, createRoom, joinRoom, all};
