const { Schema, model } = require("mongoose");

const taskSchema = new Schema(
  {
    title: { type: String },
    description: { type: String },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = model("Task", taskSchema);
