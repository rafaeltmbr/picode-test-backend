require("dotenv").config();

const config = {
  database: {
    uri: process.env.DB_URI,
  },
};

console.log(config);

module.exports = config;
