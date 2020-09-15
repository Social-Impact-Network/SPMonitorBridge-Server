var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('return latest SP KWH Data');   
});

module.exports = router;
