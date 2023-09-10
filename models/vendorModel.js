const mongoose = require("mongoose");

const vendorScehma = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: Number,
    required: true,
  },
});

const Vendor = mongoose.model("Vendor", vendorScehma);
module.exports = Vendor;
