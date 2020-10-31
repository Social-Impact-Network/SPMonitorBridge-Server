var express = require('express');
var router = express.Router();
const spMonthlyKWH_controller = require("../controllers/spMonthlyKWH_controller");

/* GET users listing. */

router.get("/:dayTs?", spMonthlyKWH_controller.findOne);


module.exports = router;