//imports
const bodyParser = require("body-parser");
const express = require("express");

//initialize
const server = express();

//database
let dataBase = [];

//middleware
server.use(bodyParser.json());

//model
function BookModel({ title, author, description }) {
  const book = {
    title,
    author,
    description,
    save: function () {
      dataBase.push(this);
      return this;
    },
  };
  return book;
}

const updateBook = (updateDetails = {}) => {
  const index = dataBase.findIndex(
    (book) => book.title === updateDetails.title
  );
  if (index !== -1) {
    dataBase[index] = { ...dataBase[index], ...updateDetails };
    return dataBase[index];
  }
  return null;
};

const deleteBank = (title) => {
  let deletedBank = null;
  const index = dataBase.findIndex((book) => book.title === title);
  if (index !== -1) {
    deletedBank = dataBase[index];
    dataBase.splice(index, 1);
  }
  return deletedBank;
};

//controllers
const getBooksController = (req, res) => {
  res.json({ message: "Book list retrieved succcessfully", data: dataBase });
};

const addBooksController = (req, res) => {
  const { title, author, description } = req.body;
  const book = new BookModel({ title, author, description });
  book.save();
  res.json({ message: "Book added successfully", data: book });
};

const updateBookController = (req, res) => {
  const { title, author, description } = req.body;
  const updatedBook = updateBook({ title, author, description });
  if (updatedBook) {
    res.json({ message: "Book is successfully updated", data: updatedBook });
  }
  res.status(404).json({ message: "No update done" });
};

const deleteBookController = (req, res) => {
  const { title } = req.body;
  const deletedBank = deleteBank(title);
  if (deletedBank) {
    res.json({
      message: "Book deleted successfully",
      data: deletedBank.title,
    });
  }
  res.status(404).json({ message: "Book not found" });
};

//routes
server.get("/books", getBooksController);
server.post("/books", addBooksController);
server.put("/books", updateBookController);
server.delete("/books", deleteBookController);

//start server
server.listen(7090, "localhost", () => {
  console.log("Server is running on port 7090");
});
