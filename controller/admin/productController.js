const Product = require("../../models/productModel");

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({
      status: "success",
      results: products.length,
      data: {
        products,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      error: err,
    });
  }
};

exports.getProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await Product.findById(id);

    if (!product) throw "No vendor found for the ID";

    res.status(200).json({
      staus: "success",
      data: {
        product,
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

exports.createProduct = async (req, res) => {
  try {
    //   const errors = validationResult(req);
    //   if (!errors.isEmpty()) {
    //     let err = {};
    //     errors.array().forEach((error) => {
    //       err[error.path] = error.msg;
    //     });
    //     throw err;
    //   }

    //   const vendor = await Vendor.create(req.body);
    res.status(201).json({
      status: "success",
      // data: {
      //   vendor,
      // },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      error: err,
    });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    //   const errors = validationResult(req);
    //   if (!errors.isEmpty()) {
    //     let err = {};
    //     errors.array().forEach((error) => {
    //       err[error.path] = error.msg;
    //     });
    //     throw err;
    //   }

    //   const id = req.params.id;
    //   const updatedResult = await Vendor.findByIdAndUpdate(id, req.body, {
    //     new: true,
    //     validators: true,
    //   });

    //   if (!updatedResult) throw "No vendor found for the ID";

    res.status(200).json({
      status: "success",
      // data: {
      //   updatedResult,
      // },
    });
  } catch (err) {
    if (err.name === "CastError") err = "Incorrect ID provided";
    res.status(400).json({
      status: "fail",
      error: err,
    });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await Product.findByIdAndDelete(id);
    if (!result) throw "No user vendor found for the ID";

    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (err) {
    if (err.name === "CastError") err = "Incorrect ID provided";
    res.status(400).json({
      status: "fail",
      error: err,
    });
  }
};
