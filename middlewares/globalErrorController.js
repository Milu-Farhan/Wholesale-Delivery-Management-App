const errorHandler = (err, req, res, next) => {
  if (err.storageErrors) {
    res.status(400).json({
      status: "fail",
      message:
        "There is an issue with image uploading. Please check the uploaded file and try again. The supported file formats are jpg, jpeg, png, gif",
    });
  }
  res.status(500).send("Internal server error");
};

module.exports = errorHandler;
