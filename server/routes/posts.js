const express = require("express");
const router = express.Router();
const postsController = require("../app/controllers/PostsController");
const trashController = require("../app/controllers/TrashController");

router.get("/posts", postsController.show);
router.get("/trash", trashController.show);

module.exports = router;
