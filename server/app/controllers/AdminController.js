const Post = require("../models/Post");

class PostController {
  //[POST] /api/admin/create
  async create(req, res) {
    const { title, description, url, image } = req.body;

    //Simple validation
    if (!title) {
      return res.status(400).json({ success: false, message: "Title is required!" });
    }

    try {
      const newPost = new Post({
        title,
        description,
        url: url.startsWith("https://") ? url : `https://${url}`,
        image,
        user: req.userId,
      });

      await newPost.save();

      res.json({ success: true, message: "Created successfully!", post: newPost });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, message: "Internal server error" });
    }
  }

  //[PUT] /api/admin/:id/update
  async update(req, res) {
    const { title, description, url, image } = req.body;

    //Simple validation
    if (!title) {
      return res.status(400).json({ success: false, message: "Title is required!" });
    }

    try {
      let updatedPost = {
        title,
        description: description || "",
        url: (url.startsWith("https://") ? url : `https://${url}`) || "",
        image: image || "",
      };

      const postUpdateConditon = { _id: req.params.id };
      updatedPost = await Post.findOneAndUpdate(postUpdateConditon, updatedPost, { new: true });

      //User not authorised to update post or post not found
      if (!updatedPost) {
        return res
          .status(401)
          .json({ success: false, message: "Post not found or user not authorized!" });
      }

      res.json({ success: true, message: "Updated successfully!", post: updatedPost });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, message: "Internal server error" });
    }
  }

  //[PUT] /api/admin/:id
  async delete(req, res) {
    try {
      const postDeleteCondition = { _id: req.params.id };
      await Post.delete(postDeleteCondition);
      const deletedPost = await Post.findOneDeleted(postDeleteCondition);
      if (!deletedPost) {
        return res
          .status(401)
          .json({ success: false, message: "Post not found or user not authorized!" });
      }

      res.json({ success: true, message: "Post deleted!", post: deletedPost });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, message: "Internal server error" });
    }
  }

  //[PUT] /api/admin/delete-all
  async deleteAll(req, res) {
    try {
      const postDeleteConditions = { _id: req.body.postIds };
      await Post.delete({ _id: { $in: postDeleteConditions._id } });
      const deletedPosts = await Post.findDeleted(postDeleteConditions);

      if (!deletedPosts) {
        return res.status(401).json({ success: false, message: "Posts not found!" });
      }

      res.json({ success: true, message: "Posts deleted!", posts: deletedPosts });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, message: "Internal server error" });
    }
  }

  //[DELETE] /api/admin/:id/force
  async forceDelete(req, res) {
    try {
      const postDeleteCondition = { _id: req.params.id };
      const deletedPost = await Post.findOneDeleted(postDeleteCondition);
      if (!deletedPost) {
        return res.status(401).json({ success: false, message: "Posts not found!" });
      }

      await Post.deleteOne(postDeleteCondition);
      res.json({ success: true, message: "Post deleted!", post: deletedPost });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, message: "Internal server error" });
    }
  }

  //[DELETE] /api/admin/force-delete-all
  async forceDeleteAll(req, res) {
    try {
      const postDeleteConditions = { _id: req.body.postIds };
      const deletedPosts = await Post.findDeleted(postDeleteConditions);
      if (!deletedPosts) {
        return res.status(401).json({ success: false, message: "Posts not found!" });
      }

      await Post.deleteMany({ _id: { $in: postDeleteConditions._id } });
      const posts = await Post.find({});
      res.json({ success: true, message: "Posts deleted!", posts: deletedPosts });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, message: "Internal server error" });
    }
  }

  //[PATCH] /api/admin/:id/restore
  async restore(req, res) {
    try {
      const postRestoreCondition = { _id: req.params.id };
      await Post.restore(postRestoreCondition);
      const restoredPost = await Post.findOne(postRestoreCondition);

      if (!restoredPost) {
        return res
          .status(401)
          .json({ success: false, message: "Post not found or user not authorized!" });
      }

      res.json({ success: true, message: "Post restored!", post: restoredPost });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, message: "Internal server error" });
    }
  }

  //[PATCH] /api/admin/restore-all
  async restoreAll(req, res) {
    try {
      const postRestoreConditions = { _id: req.body.postIds };
      await Post.restore({ _id: { $in: postRestoreConditions._id } });
      const restoredPosts = await Post.find(postRestoreConditions);

      if (!restoredPosts) {
        return res.status(401).json({ success: false, message: "Posts not found " });
      }

      res.json({ success: true, message: "Posts restored!", posts: restoredPosts });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, message: "Internal server error" });
    }
  }
}

module.exports = new PostController();
