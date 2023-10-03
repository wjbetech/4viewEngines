// imps and reqs
const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const Blog = require("./models/blog");

// create express app
const app = express();

// connect to mongoDB via mongoose
const dbUrl = "mongodb+srv://wjbe:RaksowlU7JZYkZl3@blog-cluster.iclet1k.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(result => app.listen(3000))
  .catch(error => console.log(error));

// middleware
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use((req, res, next) => {
  res.locals.path = req.path;
  next();
});

// register view engine & listen for reqs
app.set("view engine", "ejs");

// // mongoose, mongoDB testing
// // DISABLE AFTER SETUP
// app.get("/add-blog", (req, res) => {

//   // define the blog to post
//   const blog = new Blog({
//     title: 'new blog',
//     author: 'michael smith',
//     content: 'about my new blog'
//   });

//   // save the blog
//   blog.save()
//     .then(result => {
//       res.send(result);
//     })
//     .catch(error => {
//       console.log(error);
//     });
// });

// view all blogs
app.get("/all-blogs", (req, res) => {
  Blog.find()
    .then(result => {
      res.send(result);
    })
    .catch(error => {
      console.log(error);
    });
});

// view single blog by ID
app.get("/single-blog", (req, res) => {
  Blog.findById('651827700dc1ae0bbcbc6e70')
    .then(result => {
      res.send(result);
    })
    .catch(error => {
      console.log(error);
    });
});


// ROUTING
app.get('/', (req, res) => {
  res.redirect('/blogs');
});

app.get('/about', (req, res) => {
  res.render('about', { title: 'About' });
});

// blog routes
app.get('/blogs/create', (req, res) => {
  res.render('create', { title: 'Create a new blog' });
});

app.get('/blogs', (req, res) => {
  Blog.find().sort({ createdAt: -1 })
    .then(result => {
      res.render('index', { title: "All blogs", blogs: result  });
    })
    .catch(err => {
      console.log(err);
    });
});

app.post('/blogs', (req, res) => {
  const blog = new Blog(req.body);
  blog.save()
  .then(result => {
    res.redirect("/blogs");
  })
  .catch(error => {
    console.log("ERROR!", error);
  })
});

app.get("/blogs/:id", (req, res) => {
  const blogId = req.params.id;
  Blog.findById(blogId)
    .then(result => {
      res.render("details", { blog: result, title: "Blog Details" })
    })
    .catch(error => {
      console.log("ERROR!", error)
    })
})

app.delete("/blogs/:id", (req, res) => {
  const blogId = req.params.id;
  Blog.findByIdAndDelete(blogId)
    .then(() => {
      res.json({ redirect: "/blogs" })
    })
    .catch((error) => {
      console.log("ERROR!", error)
    })
})



// 404 page
app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});
