const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({
  uid: { type: String },
  email: {
    type: String,
    required: true,
  },
  imageUrl:  String ,

  name: {
    type: String,
  },
  age: {
    type: Number,
  },
  address: { type: String },

  interests: [{ type: String }],
  gender: { type: String, enum: ["Male", "Female", "Other"] },
  educationLevel: { type: String },
  interests: {
    type: [String],
    default: [],
  },
  friends: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  onlineStatus: { type: Boolean, default: false },

  about: { type: String },
});

const User = mongoose.model("User", userSchema);
module.exports = { User };
