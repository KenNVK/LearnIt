const express = require("express");
const router = express.Router();
const authController = require("../app/controllers/AuthController");
const authJwt = require("../app/middlewares/authJwt");

router.post("/signin", authController.signin);
router.post("/signup", authController.signup);
router.get("/", authJwt.verifyToken, authController.getUser);

module.exports = router;
