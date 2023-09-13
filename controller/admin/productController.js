const { validationResult } = require("express-validator");
const ObjectId = require("mongoose").Types.ObjectId;
const Product = require("../../models/productModel");

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({
      success: true,
      results: products.length,
      data: {
        products,
      },
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      errorMessage: err,
    });
  }
};

exports.getProduct = async (req, res) => {
  try {
    const id = req.params.id;

    if (!ObjectId.isValid(id)) throw "Incorrect product ID provided";

    const product = await Product.findById(id);

    if (!product) throw "No product found for the ID";

    res.status(200).json({
      success: true,
      data: {
        product,
      },
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      errorMessage: err,
    });
  }
};

exports.createProduct = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      let err = {};
      errors.array().forEach((error) => {
        err[error.path] = error.msg;
      });
      throw err;
    }

    const product = await Product.create(req.body);
    res.status(201).json({
      success: true,
      data: {
        product,
      },
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      errorMessage: err,
    });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      let err = {};
      errors.array().forEach((error) => {
        err[error.path] = error.msg;
      });
      throw err;
    }

    const id = req.params.id;

    if (!ObjectId.isValid(id)) throw "Incorrect product ID provided";

    const updatedResult = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
      validators: true,
    });

    if (!updatedResult) throw "No product found for the ID";

    res.status(200).json({
      success: true,
      data: {
        updatedResult,
      },
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      errorMessage: err,
    });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const id = req.params.id;

    if (!ObjectId.isValid(id)) throw "Incorrect product ID provided";

    const result = await Product.findByIdAndDelete(id);
    if (!result) throw "No user vendor found for the ID";

    res.status(204).json({
      success: true,
      data: null,
    });
  } catch (err) {
    if (err.name === "CastError") err = "Incorrect ID provided";
    res.status(400).json({
      success: false,
      errorMessage: err,
    });
  }
};

exports.uploadProductImage = (req, res, next) => {
  try {
    if (!req.file) {
      throw "No image was uploaded. Please upload a image";
    }
    res.status(200).json({
      success: true,
      data: {
        filename: req.file.filename,
      },
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      errorMessage: err,
    });
  }
};
