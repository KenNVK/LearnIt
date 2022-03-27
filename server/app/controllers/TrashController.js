const Post = require("../models/Post");

class TrashController {
  async show(req, res) {
    try {
      const hasTrash = await Post.findDeleted({}).populate("user", "name -_id");
      res.json({ success: true, hasTrash });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, message: "Internal server error" });
    }
  }
}

module.exports = new TrashController();
