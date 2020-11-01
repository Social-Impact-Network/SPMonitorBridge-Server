const spDailyKWH = require("../model/spDailyKWH");


exports.findKwHMonthly = (req, res) => {


    var dayIn;
    var firstDayMonth;
    var lastDayMonth; 
    var month;
    //returning monthly data based on timestamp
    if (req.params.dayTs){
      dayIn = new Date(Number(req.params.dayTs)); // @todo: Validate that param is Timestamp String and has correct length (seconds, milliseconds)
      month = firstDayMonth = new Date(dayIn.getFullYear(), dayIn.getMonth(), 1).toISOString().split("T")[0];
      lastDayMonth = new Date(dayIn.getFullYear(), dayIn.getMonth() + 1, 0).toISOString().split("T")[0];
    
    } else {
        //returning monthly data for last month
        var date = new Date();
        month = firstDayMonth = new Date(date.getFullYear(), date.getMonth()-1, 1).toISOString().split("T")[0];
        lastDayMonth = new Date(date.getFullYear(), date.getMonth(), 0).toISOString().split("T")[0];

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
          message: "No entry found ",
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
  