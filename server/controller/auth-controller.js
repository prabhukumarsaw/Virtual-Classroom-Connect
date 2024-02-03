const { User } = require("../model/user-model.js");

const home = async (req, res) => {
  try {
    res.status(200).send("Welcome to Home Page");
  } catch (error) {
    console.log(error);
  }
};

const createUser = async (req, res) => {
  try {
    const { email, name, imageUrl } = req.body;

    // Check if the user already exists in the database
    let user = await User.findOne({ email });

    if (!user) {
      // If the user does not exist, create a new user in the database
      user = await User.create({
        email,
        name,
        imageUrl,
        // Add any additional fields you want to save
      });
    } else {
      // If the user exists, update their data (e.g., update name, imageUrl, etc.)
      user.name = name;
      user.imageUrl = imageUrl;
      // Update any other fields as needed
      await user.save();
    }

    // Generate token and send it to the client
   res.status(200).json({ userId: user._id.toString() });
  } catch (error) {
    console.error('Error signing in with Google:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};






// View all users
const viewAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({ users });
  } catch (error) {
    console.error('Error viewing all users:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// View a user by ID
const getOneUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    return res.status(200).json( user );
  } catch (error) {
    console.error('Error viewing user by ID:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Update user details
const updateUser = async (req, res) => {
  try {
    const {id} = req.params;
    const updateData = req.body;

    const updatedUser = await User.findByIdAndUpdate(id, updateData, { new: true });

    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({ user: updatedUser });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Delete a user
const deleteUser = async (req, res) => {
  try {
    const {id} = req.params;
    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


module.exports = { home, createUser, getOneUser, viewAllUsers, updateUser, deleteUser};
