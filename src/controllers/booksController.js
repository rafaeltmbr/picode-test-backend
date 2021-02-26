const Book = require("../models/Book");
class BooksController {
  async index(req, res) {
    try {
      const tag = req.query.tag || "";
      const books = await Book.find({ tags: { $regex: new RegExp(tag, "i") } }).select(
        "-_id id title author description pages tags"
      );

      res.json(books);
    } catch (error) {
      res.status(400).json({ error });
    }
  }

  async create(req, res) {
    res.json({ message: "create route" });
  }

  async delete(req, res) {
    res.json({ message: "delete route" });
  }
}

module.exports = new BooksController();
