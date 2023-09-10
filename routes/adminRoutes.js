const express = require("express");
const truckDriverController = require("../controller/admin/truckDriverController");
const vendorController = require("../controller/admin/vendorController");
const productController = require("../controller/admin/productController");
const truckDriverCreateValidator = require("../validator/truckDriverCreateValidator");
const truckDriverUpdateValidator = require("../validator/truckDriverUpdateValidator");
const vendorCreateValidator = require("../validator/vendorCreateValidator");
const vendorUpdateValidator = require("../validator/vendorUpdateValidator");
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

router
  .route("/vendors")
  .get(vendorController.getAllVendors)
  .post(vendorCreateValidator, vendorController.createVendor);

router
  .route("/vendors/:id")
  .get(vendorController.getVendor)
  .patch(vendorUpdateValidator, vendorController.updateVendor)
  .delete(vendorController.deleteVendor);

router
  .route("/products")
  .get(productController.getAllProducts)
  .post(productController.createProduct);

router
  .route("/products/:id")
  .get(productController.getProduct)
  .patch(productController.updateProduct)
  .delete(productController.deleteProduct);

module.exports = router;
