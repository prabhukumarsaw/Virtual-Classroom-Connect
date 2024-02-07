const express = require("express");
const likeControllers = require('../controller/like-controller');
const Router = express.Router();

Router.route('/create').post(likeControllers.createLike);
Router.route('/delete/:sender/:receiver').delete(likeControllers.deleteLike);
Router.route('/check/:sender/:receiver').get(likeControllers.checkLike); // Add this line


module.exports = Router;