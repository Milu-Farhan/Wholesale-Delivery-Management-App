const { body } = require("express-validator");

const loginValidator = [
  body("phoneNumber").custom((value, { req }) => {
    if (!value || !/^\d{10}$/.test(value)) {
      throw new Error("Enter a valid phone number");
    }
    return true;
  }),
  body("password").notEmpty().withMessage("Password is required"),
];

module.exports = loginValidator;
