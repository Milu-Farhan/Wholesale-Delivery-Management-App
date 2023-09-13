const { validationResult } = require("express-validator");
const ObjectId = require("mongoose").Types.ObjectId;
const Vendor = require("../../models/vendorModel");

exports.getAllVendors = async (req, res) => {
  try {
    const vendors = await Vendor.find();
    res.status(200).json({
      success: true,
      results: vendors.length,
      data: {
        vendors,
      },
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      errorMessage: err,
    });
  }
};

exports.getVendor = async (req, res) => {
  try {
    const id = req.params.id;

    if (!ObjectId.isValid(id)) throw "Incorrect vendor ID provided";

    const vendor = await Vendor.findById(id);

    if (!vendor) throw "No vendor found for the ID";

    res.status(200).json({
      success: true,
      data: {
        vendor,
      },
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      errorMessage: err,
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
      success: true,
      data: {
        vendor,
      },
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      errorMessage: err,
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

    if (!ObjectId.isValid(id)) throw "Incorrect vendor ID provided";

    const updatedResult = await Vendor.findByIdAndUpdate(id, req.body, {
      new: true,
      validators: true,
    });

    if (!updatedResult) throw "No vendor found for the ID";

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

exports.deleteVendor = async (req, res) => {
  try {
    const id = req.params.id;

    if (!ObjectId.isValid(id)) throw "Incorrect vendor ID provided";

    const result = await Vendor.findByIdAndDelete(id);
    if (!result) throw "No user vendor found for the ID";

    res.status(204).json({
      success: true,
      data: null,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      errorMessage: err,
    });
  }
};
