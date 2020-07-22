const express = require('express'),
      mongoose = require('mongoose'),
      bodyParser = require('body-parser');

var app = express();
const PORT = 4200;

mongoose.connect("mongodb://localhost:2717/blog_app", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log("Connected to DB!");
})
.catch(err => {
    console.log(err);
});

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

//Schema, Model
var blogSchema = mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: {type: Date, default: Date.now}
});
var Blog = mongoose.model("Blog", blogSchema);

// Blog.create({
//     title: "Yay! Dragonflies!",
//     image: "https://images.unsplash.com/photo-1595079559940-4474acea712a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80",
//     body: "Have you ever wonder why dragons doesn't exist?"
// })

app.get("/", (req, res)=>{
    res.redirect("/blogs");
});

app.get("/blogs", (req, res)=>{
    Blog.find({}, (err, blogs)=>{
        if (err)
            console.log(err);
        else
            res.render("index", {blogs:blogs});
    });
    
});

app.listen(PORT, "localhost",() => {
    console.log("Server is running.")
});