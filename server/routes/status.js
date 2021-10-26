const express = require("express");
const router = express.Router();
const statusController = require("../app/controllers/StatusController");

router.get("/status", statusController.status);

module.exports = router;
