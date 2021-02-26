const Book = require("../models/Book");
class BooksController {
  index(req, res) {
    res.json({ message: "index route" });
  }

  create(req, res) {
    res.json({ message: "create route" });
  }

  delete(req, res) {
    res.json({ message: "delete route" });
  }
}

module.exports = new BooksController();
