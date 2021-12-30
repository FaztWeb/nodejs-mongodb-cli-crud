const { connection } = require("../db");
const Task = require("../models/Task");

const addTask = async (task) => {
  await Task.create(task);
  console.log("New Task Created");
  await connection.close();
};

const findTask = async (title) => {
  const search = new RegExp(title, "i");
  const tasks = await Task.find({
    $or: [{ title: search }, { description: search }],
  }).lean();
  // console.log(JSON.stringify(task, null, 2));
  // console.log(tasks[0]);
  // console.table(Object.entries(tasks[0]));

  if (tasks.length === 0) {
    console.log("No tasks Found");
    await connection.close();
    process.exit(0);
  }

  console.table({
    id: tasks[0]._id.toString(),
    title: tasks[0].title,
    description: tasks[0].description,
  });
  console.log(`${tasks.length} matches`);
  await connection.close();
  process.exit(0);
};

const updateTask = async (_id, newTask) => {
  await Task.updateOne({ _id }, newTask);
  console.info("Task Updated");
  await connection.close();
};

const removeTask = async (_id) => {
  await Task.deleteOne({ _id });
  console.info("Task Deleted");
  await connection.close();
};

const listTasks = async () => {
  const tasks = await Task.find().lean();
  console.log(`Total Tasks Result: ${tasks.length}`);
  // console.info(tasks);
  console.table(
    tasks.map((task) => ({
      _id: task._id.toString(),
      title: task.title,
      description: task.description,
    }))
  );
  await connection.close();
  process.exit(0);
};

module.exports = {
  addTask,
  findTask,
  updateTask,
  removeTask,
  listTasks,
};
