//imports
const mongoose = require("mongoose");

//create Schema
const Schema = mongoose.Schema;
const AuthorSchema = Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  bookId: {
    type: Schema.Types.ObjectId,
    ref: "Books",
    required: true,
  },
});

//create and connect model to schema
const AuthorModel = mongoose.model("Authors", AuthorSchema);

//exports
module.exports = AuthorModel;
