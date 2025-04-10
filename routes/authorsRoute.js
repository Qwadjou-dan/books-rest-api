//imports
const express = require("express");
const {
  createAuthorDetails,
  retrieveAuthorsDetails,
  updateAuthorDetails,
  deleteAuthorDetails,
} = require("../controllers/authorsController");

//create a router object
const router = express.Router();

//routes
router.post("/authors", createAuthorDetails);
router.get("/authors/:id?", retrieveAuthorsDetails);
router.put("/authors/:id", updateAuthorDetails);
router.delete("/authors/:id", deleteAuthorDetails);

//exports
module.exports = router;
