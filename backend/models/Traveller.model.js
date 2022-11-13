const mongoose = require("mongoose");

const { Schema } = mongoose;

const newtraveller = new Schema({
  user: String,
  username: {type:String, unique: true},
  pw:String,
  mobile: {type:String, unique: true},
  balance: Number
});

const Traveller = mongoose.model("traveller", newtraveller);

module.exports = Traveller;