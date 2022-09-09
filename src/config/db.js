const mongoose = require("mongoose");

const db = mongoose.connection;

db.once("open", () => {
  console.log("MongoDb Connection Successful");
});

const connectDB = async () => {
  await mongoose.connect(process.env.MONGODB_CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

module.exports = connectDB;
