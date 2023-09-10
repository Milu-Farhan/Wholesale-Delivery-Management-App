const Vendor = require("../../models/vendorModel");
const { validationResult } = require("express-validator");

exports.getAllVendors = async (req, res) => {
  try {
    const vendors = await Vendor.find();
    res.status(200).json({
      status: "success",
      results: vendors.length,
      data: {
        vendors,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      error: err,
    });
  }
};

exports.getVendor = async (req, res) => {
  try {
    const id = req.params.id;
    const vendor = await Vendor.findById(id);

    if (!vendor) throw "No vendor found for the ID";

    res.status(200).json({
      staus: "success",
      data: {
        vendor,
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

exports.createVendor = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      let err = {};
      errors.array().forEach((error) => {
        err[error.path] = error.msg;
      });
      throw err;
    }

    const vendor = await Vendor.create(req.body);
    res.status(201).json({
      status: "success",
      data: {
        vendor,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      error: err,
    });
  }
};

exports.updateVendor = async (req, res) => {
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
    const updatedResult = await Vendor.findByIdAndUpdate(id, req.body, {
      new: true,
      validators: true,
    });

    if (!updatedResult) throw "No vendor found for the ID";

    res.status(200).json({
      status: "success",
      data: {
        updatedResult,
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

exports.deleteVendor = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await Vendor.findByIdAndDelete(id);
    console.log(result);
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
