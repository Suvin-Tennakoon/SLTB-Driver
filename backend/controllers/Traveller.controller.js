const Traveller = require("../models/Traveller.model");

const addnewtraveller = (req, res) => {
  const { user, username, pw, mobile, balance } = req.body;

  const newtraveller = new Traveller({
    user,
    username,
    pw,
    mobile,
    balance,
  });

  newtraveller
    .save()
    .then((Traveller) => {
      res.json(Traveller);
    })
    .catch((err) => {
      res.json(err);
    });
};

const getAllTravellers = (req, res) => {
  Traveller.find()
    .then((xx) => {
      res.json(xx);
    })
    .catch((err) => {
      res.json(err);
    });
};

const getTravellerInfo = (req, res) => {
  Traveller.find({ username: req.params.travellerUN })
    .then((Traveller) => res.json(Traveller))
    .catch((err) => res.status(400).json("Error" + err));
};

const deductFair = (req, res) => {
  Traveller.findOneAndUpdate(
    { username: req.params.travellerun },
    { $set: { balance: req.params.newbalance } }
  )
    .then(() => {
      res.json("Success");
    })
    .catch((err) => {
      res.json(err);
    });
};

const deleteTraveller = (req, res) => {
  Traveller.findOneAndDelete({ username: req.params.travellerun })
    .then((x) => {
      res.json("Success");
    })
    .catch((err) => {
      res.json(err);
    });
};

module.exports = {
  addnewtraveller,
  getTravellerInfo,
  getAllTravellers,
  deductFair,
  deleteTraveller
};
