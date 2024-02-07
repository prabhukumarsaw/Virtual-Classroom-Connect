const Like = require('../model/like');

const createLike = async (req, res) => {
  try {
    const { sender, receiver } = req.body;

    const existingLike = await Like.findOne({ sender, receiver });

    if (existingLike) {
      return res.status(400).json({ message: 'Like already exists' });
    }

    const newLike = new Like({ sender, receiver });
    await newLike.save();

    res.status(201).json({ message: 'Like created successfully', like: newLike });
  } catch (error) {
    console.error('Error creating like:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const deleteLike = async (req, res) => {
  try {
    const { sender, receiver } = req.params;

    const existingLike = await Like.findOne({ sender, receiver });

    if (!existingLike) {
      return res.status(404).json({ message: 'Like not found' });
    }

    await existingLike.remove();

    res.status(200).json({ message: 'Like deleted successfully' });
  } catch (error) {
    console.error('Error deleting like:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const checkLike = async (req, res) => {
  try {
    const { sender, receiver } = req.params;

    const existingLike = await Like.findOne({ sender, receiver });

    res.status(200).json({ isLiked: !!existingLike });
  } catch (error) {
    console.error('Error checking like:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { createLike, deleteLike, checkLike };
