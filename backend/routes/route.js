const express = require("express");
const Routes = express.Router();

const {
  addnewtimetable,
  gettimetable,
} = require("../controllers/Timetable.Controller");

const {
  addnewtraveller,
  getTravellerInfo,
  getAllTravellers,
  deductFair,
  deleteTraveller,
} = require("../controllers/Traveller.controller");
const { addNewTrip, deleteUserTrips, getTripsofUser } = require("../controllers/Trip.controller");

Routes.post("/addtime", addnewtimetable);
Routes.get("/gettimetable/:Drivername", gettimetable);

Routes.post("/addnewtravller", addnewtraveller);
Routes.get("/getTravellerInfo/:travellerUN", getTravellerInfo);
Routes.get("/getAllTravellers", getAllTravellers);
Routes.put("/deductFair/:travellerun/:newbalance", deductFair);
Routes.delete("/deleteTraveller/:travellerun", deleteTraveller);

Routes.post("/addnewtrip/:travellerun", addNewTrip);
Routes.get("/getAllUserTrips/:travellerun", getTripsofUser);
Routes.delete("/deleteUserTrips/:travellerun", deleteUserTrips);

module.exports = Routes;
