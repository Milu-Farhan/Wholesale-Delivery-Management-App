const { body } = require("express-validator");
const customValidator = require("../utils/customValidatorFunctions");

validator = [
  body("name").notEmpty().withMessage("Name can't be empty"),
  body("phoneNumber").custom(customValidator.isPhonenumberValid),
  body("email").isEmail().withMessage("Invalid email address"),
  body("password").custom(customValidator.isPasswordValid),
  body("confirmPassword").custom(customValidator.isMatchingPassword),
];

module.exports = validator;
