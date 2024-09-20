const Joi = require("joi");

const registrationSchema = Joi.object({
  name: Joi.string().min(3).max(100).required(),
  email: Joi.string().email().max(100).required(),
  password: Joi.string().min(6).required(),
  address: Joi.string().max(255).optional(),
  country: Joi.string().max(100).optional(),
  education: Joi.string().max(100).optional(),
  interests: Joi.array().items(Joi.string()).optional(),
  designation: Joi.string().max(100).optional(),
  description: Joi.string().max(500).optional(),
  profileImage: Joi.string().uri().optional(),
  bannerImage: Joi.string().uri().optional(),
  friendList: Joi.array().items(Joi.string().hex().length(24)).optional(),
  notifications: Joi.array().items(Joi.string()).optional(),
  friendRequests: Joi.array().items(Joi.string().hex().length(24)).optional(),
  chat: Joi.array().items(Joi.string().hex().length(24)).optional(),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

const roomCreationSchema = Joi.object({
  title: Joi.string().min(3).max(100).required(),
  description: Joi.string().max(500).optional(),
  theme: Joi.array().items(Joi.string()).optional(),
  roomType: Joi.string().valid("public", "private").required(),
  passcode: Joi.string().when("roomType", {
    is: "private",
    then: Joi.required(),
    otherwise: Joi.optional(),
  }),
  maxParticipants: Joi.number().min(2).max(100).required(),
});


const roomJoinSchema = Joi.object({
  roomId: Joi.string().hex().length(24).required(),
  passcode: Joi.string(),
});

const messageSchema = Joi.object({
  text: Joi.string().max(1000).required(),
});

// Add validation schema for updating user
const updateUserSchema = Joi.object({
  name: Joi.string().min(3).max(100).optional(),
  email: Joi.string().email().max(100).optional(),
  address: Joi.string().max(255).optional(),
  country: Joi.string().max(100).optional(),
  education: Joi.string().max(100).optional(),
  interests: Joi.array().items(Joi.string()).optional(), // Allow any string for interests
  designation: Joi.string().max(100).optional(),
  description: Joi.string().max(500).optional(),
  profileImage: Joi.string().uri().optional(),
  bannerImage: Joi.string().uri().optional(),
  friendList: Joi.array().items(Joi.string().hex().length(24)).optional(),
  notifications: Joi.array().items(Joi.string()).optional(),
  friendRequests: Joi.array().items(Joi.string().hex().length(24)).optional(),
  chat: Joi.array().items(Joi.string().hex().length(24)).optional(),
});

const validateRegistration = (data) => registrationSchema.validate(data);
const validateLogin = (data) => loginSchema.validate(data);
const validateRoomCreation = (data) => roomCreationSchema.validate(data);
const validateRoomJoin = (data) => roomJoinSchema.validate(data);
const validateMessage = (data) => messageSchema.validate(data);
const validateUpdateUser = (data) => updateUserSchema.validate(data);

module.exports = {
  validateRegistration,
  validateLogin,
  validateRoomCreation,
  validateRoomJoin,
  validateMessage,
  validateUpdateUser,
};
