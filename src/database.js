const mongoose = require("mongoose");
const config = require("./config");

mongoose.connect(config.database.uri, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on("error", console.error.bind(console));
db.on("open", () => console.log("database connection established"));

module.exports = db;
