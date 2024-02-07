// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const { User } = require('../model/user-model');

const authenticateUser = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).send({ message: "Unauthorized access" });
  }

  // Assuming token is in the format "Bearer <jwtToken>", removing the "Bearer" prefix
  const jwtToken = token.split(' ')[1];
  console.log(jwtToken);

  jwt.verify(jwtToken, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Token is invalid!" });
    }
    req.decoded = decoded;
    next();
  });
};

module.exports = authenticateUser;
