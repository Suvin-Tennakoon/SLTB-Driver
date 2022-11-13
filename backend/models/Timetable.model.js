const mongoose = require("mongoose");
const cors = require("cors");

const { Schema } = mongoose;

const BusSchema = new Schema({
  route: String,
  Date: String,
  Arrivaltime: String,
  Destinationtime: String,
  BusNo: String,
});

const addtimetable = new Schema({
  Drivername: String,
  Busdata: [BusSchema],
});

const AddTimetable = mongoose.model("Addtimetable", addtimetable);

module.exports = AddTimetable;
