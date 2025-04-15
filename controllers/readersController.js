//imports
const ReaderModel = require("../models/readerModel");
const bcrypt = require("bcryptjs");

//controllers

const signUpController = (req, res) => {
  const { name, email, password } = req.body;
  try {
    bcrypt.hash(password, 10).then((hashPassword) => {
      const reader = ReaderModel({
        name,
        email,
        password: hashPassword,
      });
      reader
        .save()
        .then((reader) => {
          res.status(201).json({ message: "Reader created", data: reader });
        })
        .catch(() => {
          res.status(404).json({ message: "Reader not created" });
        })
        .catch((err) => console.log(err));
    });
  } catch (error) {
    console.log(error);
  }
};

const signInController = (req, res) => {
  const { email, password } = req.body;
  //locate the email
  ReaderModel.findOne({ email })
    .then((reader) => {
      //compare the password
      if (reader) {
        bcrypt
          .compare(password, reader.password)
          .then((result) => {
            if (result) {
              res.status(201).json({ message: "Reader signed in" });
            } else {
              res.json({ mesaage: "email or password incorrect" });
            }
          })
          .catch((err) => console.log(err));
      } else {
        res.status(404).json({ messsage: "Reader not found" });
      }
    })
    .catch((err) => console.log(err));
};

module.exports = { signUpController, signInController };
