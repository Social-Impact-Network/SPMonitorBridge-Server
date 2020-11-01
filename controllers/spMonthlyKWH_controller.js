const spDailyKWH = require("../model/spDailyKWH");
 /**
 * Find one User
 */
exports.findOne = (req, res) => {


    var dayIn;
    var firstDayMonth;
    var lastDayMonth; 
    var month;
    //@Todo: request specific month to
    if (req.params.dayTs){
      dayIn = new Date(Number(req.params.dayTs)).toISOString().split("T")[0]; // @todo: Validate that param is Timestamp String
    } else {
        var date = new Date();
        
        month = firstDayMonth = new Date(date.getFullYear(), date.getMonth(), 1).toISOString().split("T")[0];
        lastDayMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).toISOString().split("T")[0];

      dayIn = new Date(Date.now() - 86400000).toISOString().split("T")[0];
    }
    


    spDailyKWH.find({'day': { "$gte": firstDayMonth , "$lte": lastDayMonth}}, {'_id': false, 'plantID': false, '__v': false}).map(function(doc) {



let uniqueDays = [];
doc.forEach((c) => {

 if(uniqueDays[uniqueDays.length-1] != undefined){
     
    let active = c.day.getTime();
    let last = uniqueDays[uniqueDays.length-1].day.getTime();
    if(active !== last){
        uniqueDays.push(c);

 } } else {
    uniqueDays.push(c);


 }

});

let kwhMonth = 0;
uniqueDays.forEach((c) => {
    kwhMonth += c.kwh;
    });



     return {'results': {'month': month, 'kwh': Math.round(kwhMonth) }}
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
  