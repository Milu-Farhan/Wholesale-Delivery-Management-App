const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
  },
  email: {
    type: String,
  },
  phoneNumber: {
    type: Number,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  drivingLicense: {
    type: String,
  },
  role: {
    type: String,
    required: true,
    enum: {
      values: ["admin", "driver"],
    },
  },
  created: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
