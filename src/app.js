const express = require("express");
const helmet = require("helmet");
const config = require("./config");
const routes = require("./routes");
const errorHandling = require("./middlewares/errorHandling");
require("dotenv").config();

config();

const app = express();
const PORT = process.env.APP_PORT || 3232;

app.use(express.json());
app.use(helmet());
app.use("/api", routes);
app.use(errorHandling);

app.listen(PORT, () => {
  console.log(PORT + ". port listening");
});
