const express = require("express");
const authControllers = require('../controller/auth-controller.js');
const authRouter = express.Router();




authRouter.route('/users').post(authControllers.createUser);
authRouter.route('/users').get(authControllers.viewAllUsers);  // View all users
authRouter.route('/users/:id').get(authControllers.getOneUser);  // View a user by ID
authRouter.route('/users/:id').put(authControllers.updateUser); // Update user details
authRouter.route('/users/:id').delete(authControllers.deleteUser); // Delete a user

module.exports = authRouter;
