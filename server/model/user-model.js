const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({
  uid: { type: String },
  email: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
  },

  name: {
    type: String,
  },
  age: {
    type: Number,
  },
  address: { type: String },


  gender: { type: String, enum: ['boy', 'girl', 'non-binary'], },
  educationLevel: { type: String, enum: ['High School', 'Middle School', 'Postgraduate', 'Professional'], },

  interests: {
    type: [String],
    default: [],
  },
  friends: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  onlineStatus: { type: Boolean, default: false },

  description: { type: String },
});

const User = mongoose.model("User", userSchema);
module.exports = { User };
