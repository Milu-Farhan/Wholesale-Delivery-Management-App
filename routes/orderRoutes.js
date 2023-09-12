const express = require("express");
const orderController = require("../controller/orderController");
const createOrderValidator = require("../validator/createOrderValidator");

const router = express.Router();

router
  .route("/")
  .get(orderController.getAllOrders)
  .post(createOrderValidator, orderController.createOrder);

router.route("/:id").get(orderController.getOrder);

module.exports = router;
