const Task = require("../models/task");
const mongoose = require("mongoose");

// get all tasks
const getTasks = async (req, res) => {
  const tasks = await Task.find({}).sort({ createdAt: -1 });

  res.status(200).json(tasks);
};

// Create a new task
const createTask = async (req, res) => {
  const { body, taskCompleted } = req.body;

  let emptyFields = [];

  if (!body) {
    emptyFields.push("body");
  }
  if (typeof taskCompleted !== "boolean") {
    emptyFields.push(" taskCompleted");
  }

  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill in all fields", emptyFields });
  }

  // add to the database
  try {
    const task = await Task.create({ body, taskCompleted });
    res.status(200).json(task);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// update a task
const updateTask = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such task" });
  }

  const task = await Task.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!task) {
    return res.status(400).json({ error: "No such task" });
  }

  res.status(200).json(task);
};


// delete a task
const deleteTask = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such task" });
  }

  const task = await Task.findOneAndDelete({ _id: id });

  if (!task) {
    return res.status(400).json({ error: "No such task" });
  }

  res.status(200).json(task);
};

module.exports = {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
};
