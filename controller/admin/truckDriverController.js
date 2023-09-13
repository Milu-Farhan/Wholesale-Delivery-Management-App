const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const ObjectId = require("mongoose").Types.ObjectId;
const User = require("../../models/userModel");
const { roles } = require("../../config/config");

exports.getAllTruckDrivers = async (req, res) => {
  try {
    const users = await User.find({ role: roles.truckDriver }).select(
      "-password"
    );
    res.status(200).json({
      success: true,
      results: users.length,
      data: {
        users,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: false,
      errorMessage: err,
    });
  }
};

exports.getTruckDriver = async (req, res) => {
  try {
    const id = req.params.id;

    if (!ObjectId.isValid(id)) throw "Incorrect truck driver ID provided";

    const truckDriver = await User.findOne({
      _id: id,
      role: roles.truckDriver,
    }).select("-password");

    if (!truckDriver) throw "No truck driver found for the ID";

    res.status(200).json({
      success: true,
      data: {
        truckDriver,
      },
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      errorMessage: err,
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
      success: true,
      data: {
        truckDriver,
      },
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      errorMessage: err,
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
    let data = { ...req.body };

    if (!ObjectId.isValid(id)) throw "Incorrect truck driver ID provided";

    if (data.password) {
      const hashedPassword = await bcrypt.hash(data.password, 10);
      data = { ...data, password: hashedPassword };
    }

    const updatedResult = await User.findOneAndUpdate(
      {
        _id: id,
        role: roles.truckDriver,
      },
      data,
      {
        new: true,
        validators: true,
      }
    );

    const { password, ...user } = updatedResult._doc;

    if (!updatedResult) throw "No truck driver found for the ID";

    res.status(200).json({
      success: true,
      data: {
        user,
      },
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      errorMessage: err,
    });
  }
};

exports.deleteTruckDriver = async (req, res) => {
  try {
    const id = req.params.id;

    if (!ObjectId.isValid(id)) throw "Incorrect truck driver ID provided";

    const result = await User.deleteOne({
      _id: id,
      role: roles.truckDriver,
    });
    if (!result.deletedCount) throw "No user truck driver found for the ID";

    res.status(204).json({
      success: false,
      data: null,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      errorMessage: err,
    });
  }
};
