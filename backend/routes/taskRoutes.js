const express = require("express");
const taskController = require("../controllers/taskController");

const router = express.Router();

router.get("/", taskController.tasks);
router.post("/add", taskController.task_add);
router.put("/:id", taskController.task_edit);
router.delete("/:id", taskController.task_delete);

module.exports = router;
