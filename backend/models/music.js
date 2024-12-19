const mongoose = require("mongoose");

const musicSchema = new mongoose.Schema({
    artist: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    release_date: {
      type: Date,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    popularity:{
      type: Number,
      required: true,
    },
    genre: {
      type: String,
      required: true,
    },
  });

module.exports = mongoose.model("Song", musicSchema);
