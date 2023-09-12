const Order = require("../models/orderModel");
const Product = require("../models/productModel");

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

exports.createOrder = async (req, res) => {
  const order = req.body.products; // Array of objects with product ID and quantity
  // console.log(order);

  // Collect unique product IDs from the order
  let productIds = [];

  order.forEach((item) => {
    if (!productIds.includes(item.id)) productIds.push(item.id);
  });

  // Fetch all products in a single query
  const products = await Product.find({ _id: { $in: productIds } });

  // console.log(products);

  const productsWithInsufficientStock = [];
  let totalOrderSum = 0;

  for (const item of order) {
    const product = products.find((p) => p._id.toString() === item.id);
    console.log(products);
    console.log(product);
    if (!product) {
      // Handle the case where the product ID is not found in the database
      continue;
    }

    if (product.stock >= item.quantity) {
      console.log();
      totalOrderSum += product.price * item.quantity;
    } else {
      productsWithInsufficientStock.push({
        productId: product._id,
        productName: product.name,
        availableStock: product.stock,
      });
    }
  }

  if (productsWithInsufficientStock.length > 0) {
    res.status(400).json({
      message: "Insufficient stock for some products",
      productsWithInsufficientStock,
    });
  } else {
    res.status(200).json({ message: "Order successful", totalOrderSum, order });
  }
};
