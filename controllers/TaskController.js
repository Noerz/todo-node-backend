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

const getTasksByUser = async (req, res) => {
  const user_id = req.user.id;

  try {
    const tasks = await models.task.findAll({ where: { user_id } });

    res.status(200).json({
      success: true,
      message: "Tasks retrieved",
      data: tasks,
    });
  } catch (error) {
    console.error("Get Tasks By User Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve tasks",
      error: error.message,
    });
  }
};

const createTask = async (req, res) => {
  const {
    title,
    description,
    status = "pending",
    priority,
    deadline,
  } = req.body;
  const user_id = req.user.id;

  try {
    const task = await models.task.create({
      id: uuid.v4(),
      title,
      description,
      status,
      priority,
      deadline,
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
        status: task.status,
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

const updateTask = async (req, res) => {
  const id = req.params.id;
  const { title, description, status, priority, deadline } = req.body;

  try {
    const body = {
      title,
      description,
      status,
      priority,
      deadline,
      updatedAt: new Date(),
    };
    await models.task.update(body, {
      where: { id },
    });

    res.status(200).json({
      success: true,
      message: "Task updated",
    });
  } catch (error) {
    console.error("Update Task Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update task",
      error: error.message,
    });
  }
};

const deleteTask = async (req, res) => {
  const id = req.params.id;

  try {
    await models.task.destroy({ where: { id } });

    res.status(200).json({
      success: true,
      message: "Task deleted",
    });
  } catch (error) {
    console.error("Delete Task Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete task",
      error: error.message,
    });
  }
};

module.exports = { getAllTasks, getTask, createTask, updateTask, deleteTask,getTasksByUser };
