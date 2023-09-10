const { body } = require("express-validator");
const User = require("../models/userModel");

const isPhonenumberValid = async (val, { req }) => {
  if (!val || !/^\d{10}$/.test(val)) {
    throw new Error("Please enter a valid phone number");
  }
  if (await User.findOne({ phoneNumber: val })) {
    {
      throw new Error(
        "Account already exist with this phone number. Please choose different one."
      );
    }
  }
  return true;
};

const isPasswordValid = (val, { req }) => {
  if (!val || val.length < 8 || !/[A-Z]/.test(val) || !/\d/.test(val)) {
    throw new Error(
      "Password must contain at least one uppercase letter and one numeric digit and minimum 8 character"
    );
  }

  return true;
};

const isMatchingPassword = (val, { req }) => {
  if (val !== req.body.password) {
    throw new Error("Passwords do not match");
  }
  return true;
};

const isLicenseNumber = (val, { req }) => {
  const role = req.body.role;
  if (role === "driver") {
    if (!val) throw new Error("Please enter your driving license details");
  }
  return true;
};

signupValidator = [
  body("name").notEmpty().withMessage("Name can't be empty"),
  body("address").notEmpty().withMessage("Please enter your address"),
  body("phoneNumber").custom(isPhonenumberValid),
  body("email").optional().isEmail().withMessage("Invalid email address"),
  body("password").custom(isPasswordValid),
  body("confirmPassword").custom(isMatchingPassword),
  body("role")
    .isIn(["admin", "driver"])
    .withMessage("please select a valid role (admin or driver)"),
  body("licenseNumber").custom(isLicenseNumber),
];

module.exports = signupValidator;
