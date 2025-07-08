const express = require("express");
const authController = require("../Controllers/authControllers");
const validateToken = require("../middlewares/validateToken");

const router = express.Router();

router.route("/register").post(authController.registerNewUser);

router.route("/login").post(authController.loginUser);

router.route("/current").get(validateToken, authController.currentUserInfo);

module.exports = router;
