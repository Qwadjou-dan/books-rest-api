//imports
const bodyParser = require("body-parser");
const express = require("express");
const bookRoute = require("./routes/booksRoute");
const authorRoute = require("./routes/authorsRoute");
const readerRoute = require("./routes/readersRoute");
const mongoose = require("mongoose");

//initialize
const server = express();

//middleware
server.use(bodyParser.json());

//routes
server.use(bookRoute);
server.use(authorRoute);
server.use(readerRoute);

//start server
mongoose
  .connect(
    "mongodb+srv://DanDb:H3lKVIOItYuHadmj@cluster0.8kbvt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    server.listen(7090, "localhost", () => {
      console.log("Server is running on port 7090");
    });
  });
