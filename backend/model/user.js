const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  role: {  // Corrected typo
    type: String,
    required: true,
  },
  resume: {
    type: String,
    required: true,
  },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
