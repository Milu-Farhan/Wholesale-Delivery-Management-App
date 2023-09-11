const { body } = require("express-validator");
const customValidator = require("../utils/customValidatorFunctions");

const validator = [
  body("name").optional().custom(customValidator.isProductExist),
  body("description")
    .optional()
    .notEmpty()
    .withMessage("Description can't be empty"),
  body("price")
    .optional()
    .notEmpty()
    .isNumeric()
    .withMessage("Price must be a number"),
  body("stock")
    .optional()
    .notEmpty()
    .isInt()
    .withMessage("Stock must be a integer number"),
  body("catogory").optional().notEmpty().withMessage("Catogory can't be empty"),
  body("subCatogory")
    .optional()
    .notEmpty()
    .withMessage("Sub catogory can't be empty"),
  body("image").optional().notEmpty().withMessage("Product image is required"),
];

module.exports = validator;
