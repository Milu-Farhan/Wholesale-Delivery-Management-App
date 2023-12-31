require("dotenv").config();

const mongoose = require("mongoose");
const app = require("./app");

const database = process.env.DATABASE.replace(
  "<password>",
  process.env.DB_PASSWORD
);

mongoose.connect(database).then(() => {
  console.log("Database connected successfully");
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
