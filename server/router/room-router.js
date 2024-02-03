const express = require("express");
const roomControllers = require('../controller/room-controllers.js');
const Router = express.Router();

Router.route('/').get(roomControllers.home);
Router.route('/create').post(roomControllers.createRoom);
Router.route('/join').post(roomControllers.joinRoom);
Router.route('/all').get(roomControllers.all);

module.exports = Router;
