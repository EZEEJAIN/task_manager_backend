const constants = require("../utils/constants");
const taskService = require("../services/taskService");

const getTasks = async (req, res) => {
  try {
    const tasks = await taskService.getTaskService();
    if (tasks.status === constants.SUCCESS) {
      return res
        .status(tasks.status)
        .json({ message: tasks.message, tasks: tasks });
    } else {
      return res.status(tasks.status).json({ message: tasks.message });
    }
  } catch (error) {
    console.error("Internal server error", error);
    return res
      .status(constants.SERVER_ERROR)
      .json({ message: "Internal server error" });
  }
};
const postTasks = async (req, res) => {
  try {
    const {
      taskName,
      taskDesc,
      assignee,
      reporter,
      status,
      comment,
      startDate,
      endDate,
    } = req.body;

    const requestBody = {
      taskName,
      taskDesc,
      assignee,
      reporter,
      status: status.toLowerCase() === 'active', // converting status to boolean
      comment,
      startDate,
      endDate,
    };

    const task = await taskService.postTaskService(requestBody);
    if (task.status === constants.SUCCESS) {
      return res
        .status(task.status)
        .json({ message: task.message, task: task });
    } else {
      return res.status(task.status).json({ message: task.message });
    }
  } catch (error) {
    console.log("Internal server error", error);
    return res
      .status(constants.SERVER_ERROR)
      .json({ message: "Internal server error" });
  }
};

module.exports = { getTasks, postTasks };
