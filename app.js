//jshint esversion:6

//requiring installed packages, express and body parser
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");

//global vars
var posts = [];

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

//creating (declaring) app constant by express
const app = express();
// creating lodash
var _ = require('lodash');

//tells our app to use EJS as it's view engine
app.set('view engine', 'ejs');


app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));




//render home.ejs file at when server is at homeroute
app.get("/", function(req, res) {
  res.render("home", {
    //deliver content from server into ejs template using key value pairs
    homeStartingContent: homeStartingContent,
    posts: posts
  });
});

app.get("/about", function(req, res) {
  res.render("about", {
    //deliver content from server into ejs template using key value pairs
    aboutContent: aboutContent
  });
});

app.get("/contact", function(req, res) {
  res.render("contact", {
    //deliver content from server into ejs template using key value pairs
    contactContent: contactContent
  });
});

app.get("/compose", function(req, res) {
  res.render("compose");
});

//using express route parameter to dynampically tap into the URL
app.get("/posts/:postName", function(req, res) {
  //lodash lib to ensure url path is formatted correctly
  const requestedTitle = _.lowerCase(req.params.postName);

  for (var i = 0; i < posts.length; i++) {
    const storedTitle = _.lowerCase(posts[i].title);
    if (storedTitle == requestedTitle) {
      //IMPORTANT
      res.render("post", {
        postTitle: posts[i].title,
        postBody: posts[i].body
      });
    }
  }
});






//IMPORTANT this handles all the post requests: NEEDS TO REVIEW CORRESPONDING MODULES
app.post("/compose", function(req, res) {
  //creating an entry object
  const post = {
    //tap into the post reqest data
    title: req.body.postTitle,
    //used for truncation
    body: req.body.postBody

  };

  //appending new post into an array containing all posts
  posts.push(post);

  //redirect to homeroute
  res.redirect("/");
});










app.listen(3000, function() {
  console.log("Server started on port 3000");
});
