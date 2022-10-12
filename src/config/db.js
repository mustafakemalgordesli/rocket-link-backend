const mongoose = require("mongoose");

const connect = () => {
  const dbUri = process.env.MONGODB_CONNECTION_URL;
  mongoose
    .connect(dbUri)
    .then(() => {
      console.log("Connected to DB");
    })
    .catch((err) => {
      console.log("Could not connect to db" + err);
    });
};

module.exports = connect;
