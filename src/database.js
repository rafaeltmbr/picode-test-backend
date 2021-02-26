const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/PiCode", { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on("error", console.error.bind(console));
db.on("open", () => console.log("database connection established"));

module.exports = db;
