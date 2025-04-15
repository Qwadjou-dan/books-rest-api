//imports
const express = require("express");
const {
  signInController,
  signUpController,
} = require("../controllers/readersController");

const router = express.Router();

//Routes
router.post("/signup", signUpController);
router.post("/signin", signInController);

//exports
module.exports = router;
