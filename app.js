const express = require("express");
const userRouter = require("./routes/userRoutes");
const adminRouter = require("./routes/adminRoutes");
const authController = require("./controller/authController");

const app = express();

app.use(express.json());

app.use(authController.checkAccessToken);
app.use(authController.IsAdmin);

app.use("/api/v1/user", userRouter);
app.use("/api/v1/admin", adminRouter);

app.all("*", (req, res) => {
  res.status(404).json({
    status: "fail",
    message: `Requested page ${req.url} not found`,
  });
});

module.exports = app;
