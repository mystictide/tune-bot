const express = require("express");
const mongoose = require("mongoose");
const req = require("express/lib/request");
const dotenv = require("dotenv").config();
const favicon = require("serve-favicon");
const { errorHandler } = require("./middleware/errorMiddleware");
const twit = require("./twit");
const port = process.env.PORT || 7474;

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.CONNSTRING);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

const app = express();

app.use(errorHandler);
app.use(express.json());
app.use(favicon("favicon.ico"));
app.use(express.urlencoded({ extended: false }));

twit.postTune();
setInterval(function () {
  twit.postTune();
}, 11000000);

app.get("/", (req, res) => {
  res.send("waiting to post tune");
});

app.post("/posttune", (req, res) => {
  twit.postTune();
  res.send("tune posted");
});

connectDB().then(() => {
  app.listen(port, () => {
    console.log("listening for requests");
  });
});
