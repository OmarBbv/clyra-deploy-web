const mongoose = require("mongoose");

const searchSchema = new mongoose.Schema({
  query: { type: String, required: true, unique: true },
  count: { type: Number, default: 1 },
  lastSearchedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Search", searchSchema);
