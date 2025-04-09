//imports
const express = require("express");
const {
  getBooksController,
  addBooksController,
  updateBookController,
  deleteBookController,
} = require("../controllers/booksController");

//create a new Router object
const router = express.Router();

//routes
router.get("/books/:id?", getBooksController);
router.post("/books", addBooksController);
router.put("/books/:id", updateBookController);
router.delete("/books/:id", deleteBookController);

module.exports = router;
