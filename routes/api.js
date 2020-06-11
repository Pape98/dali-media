var express =  require('express');
var router = express.Router();
var profileData = require('../data/DALI_Data.json')
var helpers = require('../helpers/functions')

router.get('/profiles/:count', function(req,res,next){
    var count = req.params.count
    var shuffledProfileData = helpers.shuffle(profileData);
    var selectedProfileData = shuffledProfileData.slice(0,parseInt(count));
    res.json(selectedProfileData);
})

module.exports = router;