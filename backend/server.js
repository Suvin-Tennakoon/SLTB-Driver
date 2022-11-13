const express = require("express");

const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(express.json({ limit: "50mb" }));
app.use(cors());

mongoose

  .connect(
    "mongodb+srv://spm-cake_Y3S2:pwdspmcakeY3S2@cluster0.wa4tszq.mongodb.net/?retryWrites=true&w=majority",

    { useNewUrlParser: true, useUnifiedTopology: true }
  )

  .then(() => {
    console.log("Mongo DB Connected");
  })
  .catch((err) => [console.log(err)]);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log("Server is Running");
});

const routes = require("./routes/route");

app.use("/api", routes);

