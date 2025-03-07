const errorHandler = (err, req, res, next) => {
  let { statusCode, message, errors } = err;

  if (!statusCode) statusCode = 500; // Default to 500 Internal Server Error

  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
    errors: errors || [],
    stack: err.stack
  });
};

export { errorHandler };