const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true
  },
  email: {
    type: String,
    trim: true
  },
  password: {
      type: String,
      trim: true,
  },
  avatar: {
    type: String
  }
})

const User = new mongoose.model('User', userSchema);

module.exports = User;