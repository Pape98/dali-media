var express = require("express");
var url = require("url");
var router = express.Router();
var profileData = require("../data/DALI_Data.json");
var helpers = require("../helpers/functions");

router.get("/profiles/search", function (req, res, next) {
  const queryObject = url.parse(req.url, true).query;
  var name = queryObject["q"];
  var foundProfiles = [helpers.search(name, profileData)];
  if (foundProfiles[0] != undefined) {
    var editedprofileData = [];
    foundProfiles.forEach(function (profile) {
      editedprofileData.push({
        title: profile.name,
        url: "/profiles/" + profile.ID,
      });
    });
    var data = {
      results: editedprofileData,
    };
    res.json(data);
  } else {
    var data = {
        results: [],
      };
      res.json(data)
  }
});

router.get("/profiles/:count", function (req, res, next) {
  var count = req.params.count;
  var shuffledProfileData = helpers.shuffle(profileData);
  var selectedProfileData = shuffledProfileData.slice(0, parseInt(count));
  res.json(selectedProfileData);
});

module.exports = router;
