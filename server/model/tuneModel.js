const mongoose = require("mongoose");

const tuneSchema = mongoose.Schema({
  URL: { type: String, required: [true, "URL is required."] },
});

module.exports = mongoose.model("Tune", tuneSchema);
