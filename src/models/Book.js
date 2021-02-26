const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true, unique: true },
  author: { type: String, required: true },
  description: { type: String, required: true },
  pages: { type: Number, required: true },
  tags: [String],
});

bookSchema.plugin(AutoIncrement, { inc_field: "id" });

module.exports = mongoose.model("Book", bookSchema);
