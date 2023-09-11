const orderController = require("../controller/orderController");
const express = require("express");

const router = express.Router();

router
  .route("/")
  .get(orderController.getAllOrders)
  .post(orderController.createOrder);
router.route("/:id").get(orderController.getOrder);

module.exports = router;
