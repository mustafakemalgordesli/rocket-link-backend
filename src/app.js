const express = require("express");
const helmet = require("helmet");
var cors = require('cors')
const config = require("./config");
const routes = require("./routes");
const errorHandling = require("./middlewares/errorHandling");
var morgan = require("morgan");
require("dotenv").config();

config();

const app = express();
const PORT = process.env.PORT || 9000;

app.use(express.json());
app.use(express.static(__dirname + "/public"));
app.use(morgan("dev"));
app.use(helmet());
const corsOptions = {
  origin: process.env.ORIGINURL,
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions))
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});
app.get("/", (req, res) => {
  return res.status(200).send("Hello World!");
});
app.use("/api", routes);
app.use(errorHandling);

app.listen(PORT, () => {
  console.log(PORT + ". port listening");
});
