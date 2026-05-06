const AppError = require('../utils/AppError');

const notFound = (req, res, next) => {
  next(new AppError(`Route not found: ${req.originalUrl}`, 404));
};

const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  if (err.name === 'CastError') {
    return res.status(400).json({ message: 'Invalid resource identifier' });
  }

  if (err.code === 11000) {
    const duplicateField = Object.keys(err.keyValue || {})[0];
    return res.status(400).json({
      message: `${duplicateField} already exists`
    });
  }

  if (err.name === 'ValidationError') {
    return res.status(400).json({
      message: Object.values(err.errors)
        .map((item) => item.message)
        .join(', ')
    });
  }

  return res.status(statusCode).json({
    message,
  });
};

module.exports = { notFound, errorHandler };