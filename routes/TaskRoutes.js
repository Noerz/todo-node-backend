const {
  getTask,
  getAllTasks,
  createTask,
} = require("../controllers/TaskController");
const { verifyToken } = require("../middleware/VerifyAuth");

const TaskRoutes = (router) => {
  router.get("/tasks", getAllTasks);
  // router.get("/task/:id", getTask);
  router.post("/task",verifyToken, createTask);
};

module.exports = { TaskRoutes };
