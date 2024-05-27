const constants = require("../utils/constants");
const TaskManager = require("../models/taskModel");

const getTaskService = async () => {
  try {
    const tasks = await TaskManager.find({});
    return {
      tasks: tasks,
      status: constants.SUCCESS,
      message: "Tasks fetched successfully",
    };
  } catch (error) {
    console.error(error);
    return { status: constants.BAD_REQUEST, message: error.message };
  }
};

const postTaskService = async (requestBody) => {
  try {
    const task = new TaskManager(requestBody); 
    const createdTask = await task.save();
    return {
      task: createdTask,
      status: constants.RESOURCE_CREATED,
      message: "Task created successfully",
    };
  } catch (error) {
    console.log("error", error);
    return { status: constants.BAD_REQUEST, message: error.message };
  }
};

module.exports = { getTaskService, postTaskService };
