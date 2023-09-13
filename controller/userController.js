const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const { roles } = require("../config/config");
const User = require("../models/userModel");

exports.signup = async (req, res) => {
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
    data = { ...data, password: hashedPassword, role: roles.admin };
    const user = await User.create(data);
    res.status(201).json({
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

exports.login = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) throw "Incorrect phone number or password";

    const { phoneNumber, password } = req.body;

    const result = await User.findOne({ phoneNumber: phoneNumber });
    if (!result) throw "No user found for this phone number";

    const unhashed = await bcrypt.compare(password, result.password);
    if (!unhashed) throw "Incorrect phone number or password";

    const token = jwt.sign(
      { user_id: result.id, role: result.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    res.status(200).send({
      success: true,
      accesstoken: token,
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      errorMessage: err,
    });
  }
};
