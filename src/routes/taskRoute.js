const express = require("express");
const { getTasks, postTasks } = require("../controller/taskController");
const router = express.Router();

router.get("/tasks", getTasks);
router.post("/newTask", postTasks);
// router.delete("/task",)
module.exports = router;
