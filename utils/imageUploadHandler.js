const multer = require("multer");
const path = require("path");
const { allowedImageExt } = require("../config/config");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      `product-image-${Date.now()}${path
        .extname(file.originalname)
        .toLowerCase()}`
    );
  },
});

const filter = (req, file, cb) => {
  const fileExt = path.extname(file.originalname).toLowerCase();
  if (allowedImageExt.includes(fileExt)) {
    cb(null, true);
  } else {
    cb(
      new Error(
        "Invalid file type. Only jpg, jpeg, png, and gif files are allowed."
      )
    );
  }
};

module.exports = multer({
  storage: storage,
  fileFilter: filter,
  onError: function (err, next) {
    next(err);
  },
});
