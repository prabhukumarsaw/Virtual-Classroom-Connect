const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

// Generate JWT token
exports.generateToken = (user) => {
  return jwt.sign(
    { id: user._id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );
};

// Verify JWT token (if needed separately)
exports.verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};
