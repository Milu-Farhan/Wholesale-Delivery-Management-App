const bcrypt = require("bcrypt");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");

exports.signup = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const err = {};
      errors.array().forEach((error) => {
        err[error.path] = error.msg;
      });
      throw err;
    }

    let data = { ...req.body };
    const hashedPassword = await bcrypt.hash(data.password, 10);
    data = { ...data, password: hashedPassword };
    const user = await User.create(data);
    res.status(201).json({
      status: "success",
      data: {
        user,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      error: err,
    });
  }
};

exports.login = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) throw "Incorrect phone number or password";

    const { phoneNumber, password } = req.body;

    const result = await User.findOne({ phoneNumber: phoneNumber });
    if (!result) throw "Incorrect phone number or password";

    const unhashed = await bcrypt.compare(password, result.password);
    if (!unhashed) throw "Incorrect phone number or password";

    const token = jwt.sign(
      { user_id: result.id, role: result.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "1w",
      }
    );

    res.status(200).send({
      status: "success",
      accesstoken: token,
    });
  } catch (err) {
    return res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};
