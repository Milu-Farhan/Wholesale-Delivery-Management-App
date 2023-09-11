const { body } = require("express-validator");
const customValidator = require("../utils/customValidatorFunctions");

const validator = [
  body("name").custom(customValidator.isProductExist),
  body("description").notEmpty().withMessage("Description can't be empty"),
  body("price").notEmpty().isNumeric().withMessage("Price must be a number"),
  body("stock")
    .notEmpty()
    .isInt()
    .withMessage("Stock must be a integer number"),
  body("catogory").notEmpty().withMessage("Catogory can't be empty"),
  body("subCatogory").notEmpty().withMessage("Sub catogory can't be empty"),
  body("image").notEmpty().withMessage("Product image is required"),
];

module.exports = validator;
