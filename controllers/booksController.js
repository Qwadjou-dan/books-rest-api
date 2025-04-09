//import
const BookModel = require("../models/booksModel");

//controllers
const getBooksController = (req, res) => {
  //Retrieving all books
  BookModel.find()
    .then((book) => {
      res.status(201).json(book);
    })
    .catch((err) => console.log(err));

  //Retrieve one book by Id
  let { id } = req.params;
  if (id) {
    BookModel.findById(id)
      .then((book) => {
        res.status(201).json(book);
      })
      .catch((err) => console.log(err));
  }
};

const addBooksController = (req, res) => {
  const { title, author, description } = req.body;
  const book = BookModel({ title, author, description });
  book
    .save()
    .then(() => {
      res.status(201).json({ message: "Book added successfully", data: book });
    })
    .catch((err) => console.log(err));
};

const updateBookController = (req, res) => {
  const { title, author, description } = req.body;
  let { id } = req.params;

  BookModel.findById(id).then((book) => {
    if (book) {
      (book.title = title),
        (book.author = author),
        (book.description = description);
      book
        .save()
        .then(() => {
          res
            .status(201)
            .json({ message: "Book is successfully updated", data: book });
        })
        .catch((err) => console.log(err));
    } else {
      res.status(404).json({ message: "No update made" });
    }
  });
};

const deleteBookController = (req, res) => {
  let id = req.params.id;
  BookModel.findByIdAndDelete(id).then((book) => {
    if (book) {
      book.deleteOne();
      res.status(201).json({ message: "Book deleted", data: book });
    } else {
      res.status(404).json("Book not found");
    }
  });
};

module.exports = {
  getBooksController,
  addBooksController,
  updateBookController,
  deleteBookController,
};
