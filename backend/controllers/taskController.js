const Task = require("../models/task");

// get all tasks
const tasks = async (req, res) => {
  const tasks = await Task.find({}).sort({ createdAt: -1 });

  res.status(200).json(tasks);
};

const task_add = async (req, res) => {
  const { body, taskCompleted } = req.body;

  let emptyFields = [];

  if (!body) {
    emptyFields.push("body");
  }
  if ( typeof taskCompleted !== "boolean") {
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

const task_edit = (req, res) => {
  Task.findById(req.params.id, function (err, task) {
    if (!task) {
      res.status(404).send("task not found");
    } else {
      const { body, taskCompleted } = req.body;

      task.body = body;
      task.taskCompleted = taskCompleted;
      task.save((err, task) => {
        if (err) {
          console.log(err);
          res.status(400).send("updating task failed");
        } else {
          res.status(200).json({ task: "task updated" });
        }
      });
    }
  });
};

const task_delete = (req, res) => {
  const id = req.params.id;
  Task.deleteOne({ _id: id }, (err) => {
    if (err) {
      console.log(err);
      res.status(400).send("deleting task failed");
    } else {
      res.status(200).json({ task: "task deleted" });
    }
  });
};

module.exports = {
  tasks,
  task_add,
  task_edit,
  task_delete,
};
