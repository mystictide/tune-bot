const fs = require("fs");
const twit = require("twit");
const Tunes = require("./model/tuneModel");
const asyncHandler = require("express-async-handler");

const client = new twit({
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  access_token: process.env.ACCESS_TOKEN,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET,
  timeout_ms: 60 * 1000,
});

//post tweet
const postTune = asyncHandler(async (req) => {
  try {
    var response = await getTune();
    client.post(
      "statuses/update",
      { status: response.URL },
      function (err, data, response) {
        console.log(data);
      }
    );
  } catch (error) {
    console.log(error);
  }
});

//get tune
const getTune = asyncHandler(async () => {
  var count = await Tunes.count().exec();
  var random = Math.floor(Math.random() * count);
  return await Tunes.findOne().skip(random).exec();
});

//import from file
const importTunes = asyncHandler(async () => {
  let rawdata = fs.readFileSync("./tunes.json");
  let tunes = JSON.parse(rawdata);
  Tunes.insertMany(tunes);
});

module.exports = {
  postTune,
  getTune,
  importTunes,
};
