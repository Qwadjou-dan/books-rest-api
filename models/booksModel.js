//imports
const { default: mongoose } = require("mongoose");

//create Schema
const Schema = mongoose.Schema;
const BookSchema = Schema({
  title: {
    type: String,
    required: true,
  },

  author: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },
});

//Create and connect model to schema
const BookModel = mongoose.model("Books", BookSchema);

//exports
module.exports = BookModel;
