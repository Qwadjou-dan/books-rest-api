//import
const BookModel = require("../models/booksModel");
const { body, validationResult } = require("express-validator");

//Validate details
const validateBooksDetails = [
  body("description")
    .trim()
    .notEmpty()
    .withMessage("Description is required")
    .custom((value) => {
      const wordCount = value.trim().split(/\s+/).length;
      if (wordCount > 20) {
        throw new Error("Description must not exceed than 20 words");
      } else {
        return true;
      }
    }),
  body("title").trim().notEmpty().withMessage("Book title is required"),
  body("author").trim().notEmpty().withMessage("Author is required"),
];

//controllers
const getBooksController = (req, res) => {
  //Retrieve one book by Id
  let { id } = req.params;
  if (id) {
    BookModel.findById(id)
      .then((book) => {
        res.status(201).json(book);
      })
      .catch((err) => console.log(err));
  } else {
    //Retrieving all books
    BookModel.find()
      .then((book) => {
        res.status(200).json(book);
      })
      .catch((err) => console.log(err));
  }
};

const addBooksController = (req, res) => {
  const { title, author, description } = req.body;
  //validation check
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
    const AllErrMsgs = errors.array().map((err) => err.msg);
    return res.status(404).json({ message: AllErrMsgs });
  }

  const book = BookModel({ title, author, description });
  book
    .save()
    .then((book) => {
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
        .then((book) => {
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
  validateBooksDetails,
};
