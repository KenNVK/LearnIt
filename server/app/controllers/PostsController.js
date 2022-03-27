const Post = require("../models/Post");

class PostsController {
  async show(req, res) {
    try {
      const hasPosts = await Post.find({}).populate("user", "name -_id");
      res.json({ success: true, hasPosts });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, message: "Internal server error" });
    }
  }
}

module.exports = new PostsController();
