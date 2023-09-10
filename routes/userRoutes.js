const express = require("express");
const userController = require("../controller/userController");
const loginValidator = require("../validator/loginValidator");
const signupValidator = require("../validator/signupValidator");

const router = express.Router();

router.post("/signup", signupValidator, userController.signup);
router.post("/login", loginValidator, userController.login);

module.exports = router;
