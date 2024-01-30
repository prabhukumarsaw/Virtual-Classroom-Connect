const express = require("express");
const roomControllers = require('../controller/room-controllers.js');
const Router = express.Router();

Router.route('/').get(roomControllers.home);
Router.route('/create').post(roomControllers.create);
Router.route('/all').get(roomControllers.all);
Router.route('/:roomId').get(roomControllers.room);

module.exports = Router;
