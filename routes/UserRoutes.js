const { Register,Login } = require("../controller/UserController");

const userRoutes = (router) => {
  router.post("/register", Register);
  router.post("/login", Login);
};

module.exports = { userRoutes };
