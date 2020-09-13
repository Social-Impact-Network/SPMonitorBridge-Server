var express = require('express');
var router = express.Router();
var SunnyPortal = require('./sunnyportal');
const credentials = require('../private/credentials');

/* GET home page. */
router.get('/', function(req, res, next) {
  var sunnyPortal = new SunnyPortal(credentials.username, credentials.password, credentials.plantID);
  sunnyPortal.init().then(function(value) {

  console.log(sunnyPortal.PVtoday);
  console.log(sunnyPortal.PVyesterday);
  })
  
  res.render('index', { title: 'Express' });
});

module.exports = router;
