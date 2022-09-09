const express = require("express");
const UserRoute = require("./User");

const router = express.Router();

router.use("/users", UserRoute);

module.exports = router;
