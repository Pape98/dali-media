var express = require("express");
var fs = require("fs");
var router = express.Router();

var profileData = require("../data/DALI_Data.json");
var helpers = require("../helpers/functions");
var postData = require("../data/posts.json");

router.post("/", function (req, res, next) {
  var filePath = "data/posts.json";
  var newPost = req.body;
  fs.readFile(filePath, "utf-8", function (err, data) {
    if (err) throw err;
    var posts = JSON.parse(data);
    posts.posts.push(newPost);
    fs.writeFile(filePath, JSON.stringify(posts), function (err) {
      if (err) throw err;
      postData = posts;
      res.redirect("/profiles");
    });
  });
});


router.get("/", function (req, res, next) {
  var shuffledProfileData = helpers.shuffle(profileData);
  var selectedProfileData = shuffledProfileData.slice(0, 4);
  var friends = shuffledProfileData.slice(4, 7);
  var whoToFollow = shuffledProfileData.slice(7, 10);
  res.render("profile/index", {
    profileData: profileData,
    selectedProfileData: selectedProfileData,
    friends: friends,
    whoToFollow: whoToFollow,
    posts: postData,
  });
});
router.get("/:id", function (req, res, next) {
  var shuffledProfileData = helpers.shuffle(profileData);
  var id = req.params.id;
  var data = profileData.find((a) => a.ID === id);
  res.render("profile/show", {
    data: data,
    shuffledProfileData: shuffledProfileData,
    posts: postData,
  });
});

module.exports = router;
