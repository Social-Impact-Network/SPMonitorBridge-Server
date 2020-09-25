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
  /**
 * Find one User
 */
exports.findOne = (req, res) => {
  var dayIn; 
  if (req.params.dayTs){
    dayIn = new Date(Number(req.params.dayTs)).toISOString().split("T")[0]; // @todo: Validate that param is Timestamp String
  } else {
    dayIn = new Date(Date.now() - 86400000).toISOString().split("T")[0];
  }
    
  spDailyKWH.findOne({'day':dayIn}, {'_id': false, 'plantID': false, '__v': false}).map(function(doc) { 
   return {'results': {'day': doc.day.getTime(), 'kwh': parseInt(doc.kwh) }}
}).then((spDailyKWH) => {
    if (!spDailyKWH) {
      return res.status(404).send({
        message: "No entry found for day:  " + dayIn,
      });
    }
    res.status(200).send(spDailyKWH);
  })
  .catch((err) => {
    return res.status(500).send({
      message: "Error retrieving entry for " + spDailyKWH,
    });
  });
};
