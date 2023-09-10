const express = require("express");
const userRouter = require("./routes/userRoutes");
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  const { value } = req.body;
  const result = /^[A-Z](?:\d[- ]*){14}$/.test(value);
  res.send(result);
});

app.use("/api/v1/user", userRouter);

module.exports = app;
