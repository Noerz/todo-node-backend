var express = require("express");
var router = express.Router();

const { userRoutes } = require("./UserRoutes");
const { TaskRoutes } = require("./TaskRoutes");

userRoutes(router);
TaskRoutes(router);

module.exports = router;
