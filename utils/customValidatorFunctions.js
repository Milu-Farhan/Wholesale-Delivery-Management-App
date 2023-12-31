const User = require("../models/userModel");
const Product = require("../models/productModel");
const Vendor = require("../models/vendorModel");

exports.isPhonenumberValid = async (val, { req }) => {
  if (!val || !/^\d{10}$/.test(val)) {
    throw new Error("Enter a valid phone number");
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

exports.isPasswordValid = (val, { req }) => {
  if (!val || val.length < 8 || !/[A-Z]/.test(val) || !/\d/.test(val)) {
    throw new Error(
      "Password must contain at least one uppercase letter and one numeric digit and minimum 8 character"
    );
  }

  return true;
};

exports.isMatchingPassword = (val, { req }) => {
  if (!req.body.password) return true;
  if (val !== req.body.password) {
    throw new Error("Passwords do not match");
  }
  return true;
};

exports.isProductExist = async (val, { req }) => {
  if (!val) throw new Error("Name can't be empty");

  if (await Product.findOne({ name: val, brand: req.body.brand })) {
    {
      throw new Error(
        "Product already exist with this modal name and brand. Please choose different one."
      );
    }
  }
  return true;
};

exports.isVendorExist = async (val, { req }) => {
  if (!val) throw new Error("Name can't be empty");

  if (await Vendor.findOne({ name: val, phoneNumber: req.body.phoneNumber })) {
    {
      throw new Error("Vendor already exist with given name and phone number.");
    }
  }
  return true;
};
