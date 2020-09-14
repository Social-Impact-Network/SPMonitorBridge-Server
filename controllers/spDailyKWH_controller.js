const spDailyKWH = require("../model/spDailyKWH");


exports.create = (_plantID, _day, _kwh) => {
   


    /**
     * Create spDailyKWH db Input
     */
    const obj = new spDailyKWH({
    plantID: _plantID,
    day: _day,
    kwh: _kwh,
    });
    /**
     * Save user to database
     */
    
    obj
      .save(function (err) {
       
      });
  };
  