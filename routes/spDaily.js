var express = require('express');
var router = express.Router();
const spDailyKWH_controller = require("../controllers/spDailyKWH_controller");


/* GET users listing. */

router.get("/:dayTs?", spDailyKWH_controller.findOne);


module.exports = router;
