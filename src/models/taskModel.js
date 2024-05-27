const mongoose = require("mongoose");
const validator = require("validator");
const Schema = mongoose.Schema;

const taskSchema = new Schema(
  {
    taskName: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 20,
    },
    taskDesc: { type: String, required: true, minLength: 30, maxLength: 215 },
    assignee: [
      {
        type: String,
        required: true,
        validate(value) {
          if (!validator.isEmail(value)) {
            throw new Error("Invalid email address");
          }
        },
      },
    ],
    reporter: [
      {
        type: String,
        required: true,
        validate(value) {
          if (!validator.isEmail(value)) {
            throw new Error("Invalid email address");
          }
        },
      },
    ],
    status: { type: Boolean, default: true },
    comment: { type: String, minLength: 3, maxLength: 80 },
    startDate: { type: String, required: true },
    endDate: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const TaskManager = mongoose.model("TaskManager", taskSchema);
module.exports = TaskManager;
