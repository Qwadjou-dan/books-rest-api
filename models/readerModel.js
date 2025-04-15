//imports
const mongoose = require("mongoose");

//create Schema
const Schema = mongoose.Schema;
const ReaderSchema = Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

//create and connect schema to model
const ReaderModel = mongoose.model("Reader", ReaderSchema);

//exports
module.exports = ReaderModel;
