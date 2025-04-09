//imports
const bodyParser = require("body-parser");
const express = require("express");
const bookRoute = require("./routes/booksRoute");
const mongoose = require("mongoose");

//initialize
const server = express();

//middleware
server.use(bodyParser.json());

//routes
server.use(bookRoute);

//start server
mongoose
  .connect(
    "mongodb+srv://DanDb:fCYZNOkmc33UHfqp@cluster0.8kbvt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    server.listen(7090, "localhost", () => {
      console.log("Server is running on port 7090");
    });
  });
