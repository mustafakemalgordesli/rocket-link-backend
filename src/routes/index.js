const express = require("express");
const UserRoute = require("./User");
const LinkRoute = require("./Link");

const router = express.Router();

router.use("/users", UserRoute);
router.use("/links", LinkRoute);

module.exports = router;
