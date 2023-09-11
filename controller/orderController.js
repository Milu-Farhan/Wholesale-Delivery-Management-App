const Order = require("../models/orderModel");

exports.getAllOrders = async (req, res) => {
  try {
    const order = await Order.find();
    res.status(200).json({
      status: "success",
      results: order.length,
      data: {
        order,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      error: err,
    });
  }
};

exports.getOrder = async (req, res) => {
  try {
    const id = req.params.id;
    const order = await Order.findById(id);

    if (!order) throw "No order found for the ID";

    res.status(200).json({
      staus: "success",
      data: {
        order,
      },
    });
  } catch (err) {
    if (err.name === "CastError") err = "Incorrect ID provided";
    res.status(400).json({
      status: "fail",
      error: err,
    });
  }
};

exports.createOrder = (req, res) => {
  res.status(200).send("not yet");
};
