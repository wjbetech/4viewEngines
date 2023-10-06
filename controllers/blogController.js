const Blog = require("../models/blog");

// find single blog
const blogAtIndex = (req, res) => {
  Blog.find().sort({ createdAt: -1 })
  .then(result => {
    res.render('index', { title: "All blogs", blogs: result  });
  })
  .catch(err => {
    console.log(err);
  });
}

// show single blog
const blogDetails = (req, res) => {
  const blogId = req.params.id;
  Blog.findById(blogId)
  .then(result => {
    res.render("details", { blog: result, title: "Blog Details" })
  })
  .catch(error => {
    console.log("ERROR!", error)
    res.status(404).render("404", { title: "Blog not found" })

  })
}

const getCreateBlog = (req, res) => {
  res.render('create', { title: 'Create a new blog' });
}

const postCreateBlog = (req, res) => {
  const blog = new Blog(req.body);
  blog.save()
  .then(result => {
  res.redirect("/blogs");
  })
  .catch(error => {
  console.log("ERROR!", error);
  })
}

const deleteBlog = (req, res) => {
  const blogId = req.params.id;
  Blog.findByIdAndDelete(blogId)
  .then(result => {
    res.json({ redirect: "/blogs" })
  })
  .catch((error) => {
    console.log("ERROR!", error)
  })
}

module.exports = {
  blogAtIndex,
  blogDetails,
  getCreateBlog,
  postCreateBlog,
  deleteBlog
};
