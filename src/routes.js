const express = require("express");

const booksController = require("./controllers/booksController");

const router = express.Router();

router
  .get("/books", booksController.index)
  .post("/books", booksController.create)
  .delete("/books/:id", booksController.delete);

module.exports = router;
