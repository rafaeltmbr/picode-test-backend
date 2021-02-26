const Book = require("../models/Book");
const yup = require("yup");

const indexSchema = yup.object().shape({
  tag: yup.string(),
  search: yup.string(),
  page: yup.number().positive(),
  pageSize: yup.number().positive(),
});

const createSchema = yup.object().shape({
  title: yup.string().required(),
  author: yup.string().required(),
  description: yup.string().required(),
  pages: yup.number().positive(),
  tags: yup.array().of(yup.string()).required(),
});

const deleteSchema = yup.object().shape({
  id: yup.number().positive(),
});
class BooksController {
  async index(req, res) {
    try {
      await indexSchema.validate(req.query);

      const tag = req.query.tag || "";
      const search = req.query.search || "";
      const pageSize = Number(req.query.pageSize) || 10;
      const page = Number(req.query.page) || 1;

      const numberOfDocumentsToSkip = (page - 1) * pageSize;

      let query = undefined;

      if (tag) {
        query = { tags: { $regex: new RegExp(tag, "i") } };
      } else if (search) {
        query = {
          $or: [
            { title: new RegExp(search, "i") },
            { author: new RegExp(search, "i") },
            { description: new RegExp(search, "i") },
            { tags: new RegExp(search, "i") },
          ],
        };
      }

      const books = await Book.find(query)
        .limit(pageSize)
        .skip(numberOfDocumentsToSkip)
        .select("-_id id title author description pages tags");

      res.json(books);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async create(req, res) {
    try {
      const newBook = {
        title: req.body.title,
        author: req.body.author,
        description: req.body.description,
        pages: req.body.pages,
        tags: req.body.tags,
      };

      await createSchema.validate(newBook);

      if (await Book.findOne({ title: newBook.title }))
        throw Error(`The title '${newBook.title}' already exists`);

      const book = new Book(newBook);

      await book.save();

      res.status(201).json(newBook);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async delete(req, res) {
    try {
      const deleteBook = { id: req.params.id };
      await deleteSchema.validate(deleteBook);

      const book = await Book.findOne({ id: deleteBook.id });
      if (!book) throw Error(`id ${deleteBook.id} doesn't exist`);

      book.delete();

      res.status(204).json();
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

module.exports = new BooksController();
