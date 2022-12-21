const express = require("express");
const req = require("express/lib/request");
const dotenv = require("dotenv").config();
const favicon = require("serve-favicon");
const { errorHandler } = require("./middleware/errorMiddleware");
const twit = require("./twit");
const connectDB = require("./config/db");
const port = process.env.PORT || 7474;

connectDB();
const app = express();

app.use(errorHandler);
app.use(express.json());
app.use(favicon("favicon.ico"));
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  twit.postTune();
  res.send("tune posted");
});

app.listen(port, () => console.log(`server started on port: ${port}`));
