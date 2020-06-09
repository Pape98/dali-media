var express =  require('express');
var router = express.Router();
var profileData = require('../data/DALI_Data.json')
var helpers = require('../helpers/functions')

router.get('/profiles', function(req,res,next){
    var shuffledProfileData = helpers.shuffle(profileData);
    var selectedProfileData = shuffledProfileData.slice(0, 3);
    res.json(selectedProfileData);
})

module.exports = router;