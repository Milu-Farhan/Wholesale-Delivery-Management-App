const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const User = require("../../models/userModel");

exports.getAllTruckDrivers = async (req, res) => {
  try {
    const users = await User.find({ role: { $ne: "admin" } }).select(
      "-password"
    );
    res.status(200).json({
      status: "success",
      results: users.length,
      data: {
        users,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      error: err,
    });
  }
};

exports.getTruckDriver = async (req, res) => {
  try {
    const id = req.params.id;
    const truckDriver = await User.findOne({
      _id: id,
      role: { $ne: "admin" },
    }).select("-password");

    if (!truckDriver) throw "No truck driver found for the ID";

    res.status(200).json({
      staus: "success",
      data: {
        truckDriver,
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

exports.createTruckDriver = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      let err = {};
      errors.array().forEach((error) => {
        err[error.path] = error.msg;
      });
      throw err;
    }

    let data = { ...req.body };
    const hashedPassword = await bcrypt.hash(data.password, 10);
    data = { ...data, password: hashedPassword };
    const result = await User.create(data);
    const { password, ...truckDriver } = result._doc;

    res.status(201).json({
      status: "success",
      data: {
        truckDriver,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      error: err,
    });
  }
};

exports.updateTruckDriver = async (req, res) => {
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
    const updatedResult = await User.findOneAndUpdate(
      {
        _id: id,
        role: { $ne: "admin" },
      },
      req.body,
      {
        new: true,
        validators: true,
      }
    );

    if (!updatedResult) throw "No truck driver found for the ID";

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

exports.deleteTruckDriver = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await User.deleteOne({
      _id: id,
      role: { $ne: "admin" },
    });
    if (!result.deletedCount) throw "No user truck driver found for the ID";

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
