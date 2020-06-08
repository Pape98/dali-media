var express = require('express');
var router = express.Router();

var profileData = require('../data/DALI_Data.json');
var helpers = require ('../helpers/functions');


/* GET home page. */
router.get('/', function(req, res, next) {
  var shuffledProfileData = helpers.shuffle(profileData);
  var selectedProfileData = shuffledProfileData.slice(0,3);
  res.render('profile/index',{profileData:profileData, selectedProfileData:selectedProfileData});
});

module.exports = router;
