const Order = require("../models/orderModel");
const Product = require("../models/productModel");
const { validationResult } = require("express-validator");

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
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      let err = {};
      errors.array().forEach((error) => {
        err[error.path] = error.msg;
      });
      throw err;
    }

    const productList = req.body.products;
    const productIds = Array.from(new Set(productList.map((item) => item.id)));
    const products = await Product.find({ _id: { $in: productIds } });
    const updatedProductStocks = [];
    const productsWithInsufficientStock = [];
    let totalOrderSum = 0;

    for (const item of productList) {
      const product = products.find((p) => p._id.toString() === item.id);

      if (!product) {
        throw new Error("No products found with product IDs");
      }

      if (product.stock >= item.quantity) {
        totalOrderSum += product.price * item.quantity;

        const updatedStock = product.stock - item.quantity;
        updatedProductStocks.push({
          productId: product._id,
          updatedStock: updatedStock,
        });
      } else {
        productsWithInsufficientStock.push(product);
      }
    }

    if (productsWithInsufficientStock.length) {
      return res.status(400).json({
        status: "fail",
        message: "Insufficient stock for some products",
        result: { productsWithInsufficientStock },
      });
    }

    const productUpdates = updatedProductStocks.map(
      ({ productId, updatedStock }) => {
        return {
          updateOne: {
            filter: { _id: productId },
            update: { $set: { stock: updatedStock } },
          },
        };
      }
    );

    await Product.bulkWrite(productUpdates);

    const order = await Order.create({
      products,
      truckDriver: req.body.truckDriver,
      vendor: req.body.vendor,
      collectedAmount: req.body.collectedAmount,
      totalAmount: totalOrderSum,
    });

    res.status(200).json({
      status: "success",
      result: order,
    });
  } catch (err) {
    if (err.name === "CastError") err = "Incorrect ID provided";
    res.status(400).json({
      status: "fail",
      error: err,
    });
  }
};
