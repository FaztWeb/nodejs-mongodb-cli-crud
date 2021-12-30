#!/usr/bin/env node
const { connectDB } = require("./db");
require("./commands");
// User Questions

async function main() {
  await connectDB();
}

main();
