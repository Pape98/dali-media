var express = require('express');
var fs = require('fs');
var router = express.Router();

var profileData = require('../data/DALI_Data.json');
var helpers = require('../helpers/functions');


router.get('/', function (req, res, next) {
  var shuffledProfileData = helpers.shuffle(profileData);
  var selectedProfileData = shuffledProfileData.slice(0, 4);
  var friends = shuffledProfileData.slice(4, 7);
  var whoToFollow = shuffledProfileData.slice(7, 10);
  res.render('profile/index', {
    profileData: profileData,
    selectedProfileData: selectedProfileData,
    friends: friends,
    whoToFollow: whoToFollow
  });
});

router.post('/',function(req,res,next){
  var filePath = 'data/posts.txt';
  var newPost = JSON.stringify(req.body, null, 4);
  fs.appendFile(filePath,newPost,function(err){
    if (err) throw err;
    fs.readFile(filePath,'utf8',function(err, data) {
      res.json(JSON.parse(data));
    });
  });
});

router.get('/:id',function(req,res,next){
  var shuffledProfileData = helpers.shuffle(profileData);
  var id = req.params.id;
  var data = profileData.find(a => a.ID === id);
  console.log(helpers);
  res.render('profile/show', {data:data,shuffledProfileData:shuffledProfileData});
});


module.exports = router;