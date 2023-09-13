const errorHandler = (err, req, res, next) => {
  if (err.storageErrors) {
    res.status(400).json({
      success: false,
      errorMessage:
        "There is an issue with image uploading. Please check the uploaded file and try again. The supported file formats are jpg, jpeg, png, gif",
    });
  }
  if (err.type === "entity.parse.failed") {
    res.status(400).json({
      success: false,
      errorMessage: "Please provide a valid JSON data",
    });
  }

  res.status(500).send("Internal server error");
};

module.exports = errorHandler;
