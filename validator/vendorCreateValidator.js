const { body } = require("express-validator");
const customValidator = require("../utils/customValidatorFunctions");

const validator = [
  body("name").custom(customValidator.isVendorExist),
  body("location").notEmpty().withMessage("Location can't be empty"),
  body("email").isEmail().withMessage("Invalid email address"),
  body("phoneNumber").custom((val, { req }) => {
    if (!val || !/^\d{10}$/.test(val)) {
      throw new Error("Enter a valid phone number");
    }
    return true;
  }),
];

module.exports = validator;
