const { Register,Login } = require("../controllers/UserController");

const userRoutes = (router) => {
  router.post("/register", Register);
  router.post("/login", Login);
};

module.exports = { userRoutes };
