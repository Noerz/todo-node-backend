const {
  getTask,
  getTasksByUser,
  getAllTasks,
  createTask,
  updateTask,
  deleteTask,
} = require("../controllers/TaskController");
const { verifyToken } = require("../middleware/VerifyAuth");

const TaskRoutes = (router) => {
  router.post("/tasks", verifyToken, getAllTasks);
  // router.get("/task/:id", getTask);
  router.post("/tasks/user", verifyToken, getTasksByUser);
  router.post("/createTask", verifyToken, createTask);
  router.put("/task/:id", verifyToken, updateTask);
  router.delete("/task/:id", verifyToken, deleteTask);
};

module.exports = { TaskRoutes };
