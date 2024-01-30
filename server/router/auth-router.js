const express = require("express");
const authControllers = require('../controller/auth-controller.js');
const authRouter = express.Router();

authRouter.route('/').get(authControllers.home);
authRouter.route('/register').post(authControllers.register);
authRouter.route('/login').post(authControllers.login);

module.exports = authRouter;
