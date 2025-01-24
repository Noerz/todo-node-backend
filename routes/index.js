var express = require("express");
var router = express.Router();

const { userRoutes } = require("./UserRoutes");

userRoutes(router);

module.exports = router;
