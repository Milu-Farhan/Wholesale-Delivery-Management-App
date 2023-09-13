const { validationResult } = require("express-validator");
const ObjectId = require("mongoose").Types.ObjectId;
const Order = require("../models/orderModel");
const Product = require("../models/productModel");

exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("products.product")
      .populate("truckDriver", "-password")
      .populate("vendor")
      .populate("createdBy", "-password");

    res.status(200).json({
      success: true,
      results: orders.length,
      data: {
        orders,
      },
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      errorMessage: err,
    });
  }
};

exports.getOrder = async (req, res) => {
  try {
    const id = req.params.id;

    if (!ObjectId.isValid(id)) throw "Incorrect order ID provided";

    const order = await Order.findById(id)
      .populate("products.product")
      .populate("truckDriver", "-password")
      .populate("vendor")
      .populate("createdBy", "-password");

    if (!order) throw "No order found for the ID";

    res.status(200).json({
      success: true,
      data: {
        order,
      },
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      errorMessage: err,
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

    const data = req.body;

    if (!ObjectId.isValid(data.truckDriver))
      throw "Incorrect truck driver ID provided";
    if (!ObjectId.isValid(data.vendor)) throw "Incorrect vendor ID provided";
    if (!ObjectId.isValid(data.createdBy))
      throw "Incorrect created user ID provided";

    const productList = data.products;
    const productIds = Array.from(
      new Set(
        productList.map((item) => {
          if (!ObjectId.isValid(item.id)) throw "Incorrect product ID provided";
          return item.id;
        })
      )
    );
    const products = await Product.find({ _id: { $in: productIds } });
    const updatedProductStocks = [];
    const productsWithInsufficientStock = [];
    let totalOrderSum = 0;

    for (const item of productList) {
      const product = products.find((p) => p._id.toString() === item.id);

      if (!product) {
        throw `No products found with product ID: ${item.id}`;
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
        success: false,
        message: "Insufficient stock for some products",
        errorMessage: { productsWithInsufficientStock },
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

    const updatedProductList = productList.map((product) => ({
      product: product.id,
      quantity: product.quantity,
    }));

    await Product.bulkWrite(productUpdates);
    const result = await Order.create({
      // products: productList,
      products: updatedProductList,
      truckDriver: data.truckDriver,
      vendor: data.vendor,
      collectedAmount: data.collectedAmount,
      totalAmount: totalOrderSum,
      createdBy: data.createdBy,
    });

    const order = await Order.findById(result._id)
      .populate("products.product")
      .populate("truckDriver", "-password")
      .populate("vendor")
      .populate("createdBy", "-password");

    res.status(200).json({
      success: true,
      result: order,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      errorMessage: err,
      err: err.stack,
    });
  }
};
