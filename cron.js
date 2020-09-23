const cron = require("node-cron");
var SunnyPortal = require('./private/sunnyportal');

const spDailyKWH = require("./controllers/spDailyKWH_controller");


cron.schedule("0 */12 * * *", function() {
    console.log(new Date().toString() + " | Gathering SunnyPortal Data for: " + process.env.SPusername + "; Plant: " + process.env.SPplantID);
    var sunnyPortal = new SunnyPortal(process.env.SPusername, process.env.SPpassword, process.env.SPplantID);
    sunnyPortal.init().then(function() {
      spDailyKWH.create(process.env.SPplantID,sunnyPortal.PVyesterday[1],sunnyPortal.PVyesterday[0]);
    })
  });