//imports
const AuthorModel = require("../models/authorModel");

//controllers

const createAuthorDetails = (req, res) => {
  const { name, email, country, bookId } = req.body;
  try {
    const author = AuthorModel({
      name,
      email,
      country,
      bookId,
    });
    author
      .save()
      .then((author) => {
        res.status(201).json({ message: "Author added", data: author });
      })
      .catch((err) => console.log(err));
  } catch (error) {
    res.status(404).json({ message: "Author not created" });
  }
};

const retrieveAuthorsDetails = (req, res) => {
  //Retrieve one author using id
  let { id } = req.params;
  if (id) {
    AuthorModel.findById(id)
      .populate("bookId", "title description -_id")
      .then((author) => {
        res.status(201).json({ message: "Author retrieved", data: author });
      })
      .catch((err) => console.log(err));
  } else {
    //Retrieve all authors
    AuthorModel.find()
      .populate("bookId", "title description -_id")
      .then((authors) => {
        res.status(201).json({ message: "Authors retrieved", data: authors });
      })
      .catch((err) => console.log(err));
  }
};

const updateAuthorDetails = (req, res) => {
  const { name, email, country } = req.body;
  let { id } = req.params;

  AuthorModel.findById(id).then((author) => {
    if (author) {
      author.name = name;
      author.email = email;
      author.country = country;
      author
        .save()
        .then((updatedAuthor) => {
          res
            .status(200)
            .json({ message: "Author info updated", data: updatedAuthor });
        })
        .catch((err) => console.log(err));
    } else {
      res.status(404).json({ message: "Author not updated" });
    }
  });
};

const deleteAuthorDetails = (req, res) => {
  let { id } = req.params;
  AuthorModel.findByIdAndDelete(id)
    .then((author) => {
      if (author) {
        author.deleteOne();
        res.status(201).json({ message: "Author deleted", data: author });
      } else {
        res.status(404).json({ message: "Author not found" });
      }
    })
    .catch((err) => console.log(err));
};

module.exports = {
  createAuthorDetails,
  retrieveAuthorsDetails,
  updateAuthorDetails,
  deleteAuthorDetails,
};
