const Task = require("../models/task");
const tasks = (req, res) => {
  Task.find(function (err, tasks) {
    if (err) {
      console.log(err);
    } else {
      res.json(tasks);
    }
  });
};

const task_add = (req, res) => {
  let task = new Task(req.body);
  task.save((err, task) => {
    if (err) {
      console.log(err);
      res.status(400).send("adding task failed");
    } else {
      res.status(200).json({ task: "task added" });
    }
  });
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
