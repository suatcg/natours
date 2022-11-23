class AppError extends Error {
  constructor(message, statusCode) {
    super(message);

    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true;

    // This will prevent the stack with constructor method on error stack, so it won't pollute the error stack
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;
