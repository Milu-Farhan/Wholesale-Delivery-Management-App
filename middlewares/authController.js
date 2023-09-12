const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const excludedPaths = ["/api/v1/user/login", "/api/v1/user/signup"];

exports.checkAccessToken = async (req, res, next) => {
  if (excludedPaths.includes(req.url)) return next();

  let token = req.headers.authorization;

  if (!token)
    return res.status(401).json({
      status: "fail",
      message: "Access Denied / Unauthorized request",
    });

  try {
    token = token.split(" ")[1];

    if (!token || token === "null")
      return res
        .status(401)
        .json({ status: "fail", message: "Unauthorized request" });

    let verifiedUser = jwt.verify(token, process.env.JWT_SECRET);
    if (!verifiedUser)
      return res
        .status(401)
        .json({ status: "fail", message: "Unauthorized request" });

    const isValidUser = await User.findById(verifiedUser.user_id);
    if (!isValidUser)
      return res.status(401).json({
        status: "fail",
        message: "Unauthorized request. User not found.",
      });

    req.user = verifiedUser;
    next();
  } catch (err) {
    res.status(400).send(err);
  }
};

exports.IsAdmin = async (req, res, next) => {
  if (excludedPaths.includes(req.url)) return next();

  if (req.user.role === "admin") return next();

  if (req.user.role && req.url === /^\/api\/v1\/orders\/\d+$/.test(req.url))
    return next();

  return res.status(403).json({
    status: "fail",
    message: "You don't have enough permission to access this resource",
  });
};
