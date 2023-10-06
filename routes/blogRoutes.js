const express = require("express");
const router = express.Router();
const blogController = require("../controllers/blogController");

// blog routes
// controllers => blogController to view funcs
router.get('/blogs/create', blogController.getCreateBlog);
router.get('/blogs', blogController.blogAtIndex);
router.get("/blogs/:id", blogController.blogDetails)
router.post('/blogs', blogController.postCreateBlog);
router.delete("/blogs/:id", blogController.deleteBlog)

module.exports = router;
