const { body } = require("express-validator");
const customValidator = require("../utils/customValidatorFunctions");

const allowed_roles = ["driver", "admin"];

validator = [
  body("name").optional().notEmpty().withMessage("Name can't be empty"),
  body("phoneNumber").optional().custom(customValidator.isPhonenumberValid),
  body("email").optional().isEmail().withMessage("Invalid email address"),
  body("address").optional().notEmpty().withMessage("Enter your address"),
  body("password").optional().custom(customValidator.isPasswordValid),
  body("confirmPassword").custom(customValidator.isMatchingPassword),
  body("role")
    .optional()
    .isIn(allowed_roles)
    .withMessage(`please specify role. Allowed roles are [${allowed_roles}]`),
  body("licenseNumber").optional().notEmpty().withMessage("add license number"),
];

module.exports = validator;
