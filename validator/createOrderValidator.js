const { body } = require("express-validator");

const validator = [
  body("products")
    .notEmpty()
    .withMessage("Add products with the product ID and quantity")
    .custom((val, { req }) => {
      const seen = new Set();

      val.forEach((item) => {
        if (seen.has(item.id)) {
          throw new Error(`Duplicate ID found for products: ${item.id}`);
        }
        seen.add(item.id);
      });

      return true;
    }),
  body("vendor").notEmpty().withMessage("Vendor can't be empty"),
  body("truckDriver").notEmpty().withMessage("Truck driver can't be empty"),
  body("collectedAmount")
    .isNumeric()
    .withMessage("Collected amount can't be empty"),
];

module.exports = validator;
