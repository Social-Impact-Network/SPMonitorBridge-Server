const cron = require("node-cron");
var SunnyPortal = require('./private/sunnyportal');

const spDailyKWH = require("./controllers/spDailyKWH_controller");


cron.schedule("*/1 * * * *", function() {
console.log("test");
console.log(process.env);

/*    console.log("---------------------");
    console.log(new Date().toString() + " | Gathering SunnyPortal Data for: " + credentials.username + "; Plant: " + credentials.plantID);

    var sunnyPortal = new SunnyPortal(credentials.username, credentials.password, credentials.plantID);
    sunnyPortal.init().then(function() {
      spDailyKWH.create(credentials.plantID,sunnyPortal.PVyesterday[1],sunnyPortal.PVyesterday[0]);
    })*/
  });