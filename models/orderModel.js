const mongoose = require("mongoose");

const orderSchema = mongoose.Schema(
  {
    products: {
      type: [
        new mongoose.Schema(
          {
            product: {
              type: mongoose.Schema.ObjectId,
              ref: "Product",
              required: true,
            },
            quantity: {
              type: Number,
              required: true,
            },
          },
          { _id: false }
        ),
      ],
      required: true,
    },
    truckDriver: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
    vendor: {
      type: mongoose.Schema.ObjectId,
      ref: "Vendor",
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
    createdBy: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
