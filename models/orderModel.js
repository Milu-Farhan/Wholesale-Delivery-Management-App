const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
  products: {
    type: Array,
    required: true,
  },
  truckDriver: {
    type: String,
    required: true,
  },
  vendor: {
    type: String,
    required: true,
  },
  totalAmount: {
    type: Number,
    required: true,
  },
  collectedAmount: {
    type: Number,
    required: true,
  },
  created: {
    type: Date,
    default: Date.now,
  },
});

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
