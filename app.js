const express = require("express");
const userRouter = require("./routes/userRoutes");
const authController = require("./controller/authController");

const app = express();

app.use(express.json());

app.use(authController.checkAccessToken);
app.use(authController.IsAdmin);

app.use("/api/v1/user", userRouter);

app.all("*", (req, res) => {
  res.status(404).json({
    status: "fail",
    message: `Requested page ${req.url} not found`,
  });
});

module.exports = app;
