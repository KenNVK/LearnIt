const express = require("express");
const router = express.Router();
const statusController = require("../app/controllers/StatusController");

router.get("/", statusController.status);

module.exports = router;
