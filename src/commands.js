const { program } = require("commander");
const {
  addTask,
  findTask,
  updateTask,
  removeTask,
  listTasks,
} = require("./controllers/task.controller");
const { prompt } = require("inquirer");

const taskQuestion = [
  {
    type: "input",
    name: "title",
    message: "Task Title",
  },
  {
    type: "input",
    name: "description",
    message: "Task Description",
  },
];

program.version("0.0.1").description("Task Management CLI");

program
  .command("save")
  .alias("s")
  .description("Save a new task")
  .action(async () => {
    const answers = await prompt(taskQuestion);
    addTask(answers);
  });

program
  .command("list")
  .alias("l")
  .description("list all tasks")
  .action(async () => listTasks());

program
  .command("find <task>")
  .alias("f")
  .description("find a task")
  .action((text) => findTask(text));

program
  .command("update <id>")
  .alias("u")
  .description("update a task")
  .action(async (_id) => {
    const answers = await prompt(taskQuestion);
    await updateTask(_id, answers);
  });

program
  .command("delete <id>")
  .alias("d")
  .description("remove a task")
  .action((_id) => removeTask(_id));

program.parse(process.argv);
