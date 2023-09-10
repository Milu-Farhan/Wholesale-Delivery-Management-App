const express = require("express");
const truckDriverController = require("../controller/admin/truckDriverController");
const truckDriverCreateValidator = require("../validator/truckDriverCreateValidator");
const truckDriverUpdateValidator = require("../validator/truckDriverUpdateValidator");
const router = express.Router();

router
  .route("/users")
  .get(truckDriverController.getAllTruckDrivers)
  .post(truckDriverCreateValidator, truckDriverController.createTruckDriver);

router
  .route("/users/:id")
  .get(truckDriverController.getTruckDriver)
  .patch(truckDriverUpdateValidator, truckDriverController.updateTruckDriver)
  .delete(truckDriverController.deleteTruckDriver);

module.exports = router;
