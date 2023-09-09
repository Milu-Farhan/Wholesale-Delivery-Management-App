const express = require("express");
const mongooe = require("mongoose");
require("dotenv").config();
const app = express();

const database = process.env.DATABASE.replace(
  "<password>",
  process.env.DB_PASSWORD
);

mongooe.connect(database).then(() => {
  console.log("Database connected successfully");
});

app.get("/", (req, res) => {
  res.send("Hello World");
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
