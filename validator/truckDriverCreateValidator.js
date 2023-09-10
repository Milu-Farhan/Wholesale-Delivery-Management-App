const { body } = require("express-validator");
const customValidator = require("../utils/commonValidatorFunctions");

const allowed_roles = ["driver"];

validator = [
  body("name").notEmpty().withMessage("Name can't be empty"),
  body("phoneNumber").custom(customValidator.isPhonenumberValid),
  body("email").optional().isEmail().withMessage("Invalid email address"),
  body("address").notEmpty().withMessage("Enter your address"),
  body("password").custom(customValidator.isPasswordValid),
  body("confirmPassword").custom(customValidator.isMatchingPassword),
  body("role")
    .isIn(allowed_roles)
    .withMessage(`please specify role. Allowed roles are [${allowed_roles}]`),
  body("licenseNumber").notEmpty().withMessage("add license number"),
];

module.exports = validator;
