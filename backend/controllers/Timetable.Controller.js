const timetable = require("../models/Timetable.model");

const addnewtimetable = (req, res) => {
  const { Drivername, Busdata } = req.body;

  const newtimetable = new timetable({
    Drivername,
    Busdata,
  });

  newtimetable
    .save()
    .then((timetable) => {
      res.json(timetable);
    })
    .catch((err) => {
      res.json(err);
    });
};

const gettimetable =(req,res) =>{
    timetable
    .find({ Drivername: req.params.Drivername })
    .then((timetable) => res.json(timetable))
    .catch((err) => res.status(400).json("Error" + err))

}
module.exports = {
  addnewtimetable,
  gettimetable,
};
