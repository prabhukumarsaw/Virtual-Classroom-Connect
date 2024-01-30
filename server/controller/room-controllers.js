
const express = require('express');
const Room = require('../model/room-model'); // Adjust the path based on your project structure

//  router
const home = async (req, res) => {
  try {
    res.status(200).send("Welcome to Home Page");
  } catch (error) {
    console.log(error);
  }
};

// Route to create a new room
const create =  async (req, res) => {
  try {
    const { name, description, maxParticipants } = req.body;
    
    // Create a new room
    const room = new Room({
      name,
      description,
      maxParticipants,
    });

    // Save the room to the database
    const savedRoom = await room.save();

    res.status(201).json(savedRoom);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Route to get all rooms
const all =  async (req, res) => {
  try {
    // Retrieve all rooms from the database
    const rooms = await Room.find();

    res.status(200).json(rooms);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Route to get room details by ID
const room =  async (req, res) => {
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
module.exports = {home, create, all, room};
