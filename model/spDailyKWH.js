const mongoose = require("../db");

const spDailyKWHschema = new mongoose.Schema({  
  plantID: String,
  day: { type: Date},
  kwh: Number,
});
module.exports = mongoose.model('SPdailyKWH', spDailyKWHschema);