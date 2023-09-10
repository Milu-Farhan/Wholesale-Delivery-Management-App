const { body } = require("express-validator");

const validator = [
  body("name").optional().notEmpty().withMessage("Name can't be empty"),
  body("location").optional().notEmpty().withMessage("Location can't be empty"),
  body("email").optional().isEmail().withMessage("Invalid email address"),
  body("phoneNumber")
    .optional()
    .custom((val, { req }) => {
      if (!val || !/^\d{10}$/.test(val)) {
        throw new Error("Enter a valid phone number");
      }
      return true;
    }),
];

module.exports = validator;
