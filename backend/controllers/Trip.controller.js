const Trip = require("../models/Trips.model");

const addNewTrip = (req, res) => {
  const usertrip = {
    start: req.body.start,
    end: req.body.end,
    fair: req.body.fair,
    date: new Date(),
  };

  let filter = { username: req.params.travellerun };
  let query = { $push: { usertrips: usertrip } };

  Trip.findOneAndUpdate(filter, query, {
    new: true,
    upsert: true,
  })
    .then((Trip) => {
      res.json("Success");
    })
    .catch((err) => {
      res.json(err);
    });
};

const getTripsofUser = (req, res) => {
  Trip.findOne({ username: req.params.travellerun })
    .then((Trip) => {
      res.json(Trip);
    })
    .catch((err) => {
      res.json(err);
    });
};

const deleteUserTrips = (req, res) => {
  Trip.findOneAndDelete({ username: req.params.travellerun })
    .then(() => {
      res.json("Success");
    })
    .catch((err) => {
      res.json(err);
    });
};

module.exports = {
  addNewTrip,
  getTripsofUser,
  deleteUserTrips
};
