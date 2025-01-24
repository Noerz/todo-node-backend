const db = require("../config/database");
const initModels = require("../models/init-models");
const models = initModels(db);
const uuid = require("uuid");

const getAllTasks = async (req, res) => {
  try {
    const tasks = await models.task.findAll();

    res.status(200).json({
      success: true,
      message: "Tasks retrieved",
      data: tasks,
    });
  } catch (error) {
    console.error("Get All Tasks Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve tasks",
      error: error.message,
    });
  }
};

const getTask = async (req, res) => {
  const id = req.params.id;

  try {
    const task = await models.task.findOne({ where: { id } });

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Task retrieved",
      data: task,
    });
  } catch (error) {
    console.error("Get Task Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve task",
      error: error.message,
    });
  }
};

const createTask = async (req, res) => {
  const { title, description } = req.body;
  const user_id = req.decoded.id;

  try {
    const task = await models.task.create({
      id: uuid.v4(),
      title,
      description,
      user_id: user_id,
      createdAt: new Date(),
    });

    res.status(201).json({
      success: true,
      message: "Task Created",
      data: {
        id: task.id,
        title: task.title,
        description: task.description,
        createdAt: task.createdAt,
      },
    });
  } catch (error) {
    console.error("Create Task Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create task",
      error: error.message,
    });
  }
};

module.exports = { getAllTasks, getTask, createTask };
