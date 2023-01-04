const mongoose = require("mongoose");

const conn = mongoose
  .connect(process.env.MONGODB_URI)
  .then((db) => {
    console.log("database is connected");
  })
  .catch((err) => console.log(err));

module.exports = conn;
