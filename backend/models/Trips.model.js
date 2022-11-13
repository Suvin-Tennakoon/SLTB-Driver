const mongoose = require("mongoose");

const { Schema } = mongoose;

const usertrip = {
    start: String,
    end :String,
    fair: Number,
    date: Date
}

const newtrip = new Schema({
  username: {type:String, unique: true},
  usertrips : [usertrip]
});

const Trip = mongoose.model("trip", newtrip);

module.exports = Trip;