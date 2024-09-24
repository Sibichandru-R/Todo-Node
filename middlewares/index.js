import { statusCodes } from '../constants.js';

export const errorHandler = (error, req, res, next) => {
  const errorMessage = error.message || 'Something went wrong';
  res.status(statusCodes.internalServerError).json({
    status: statusCodes.internalServerError,
    message: errorMessage,
    stack: error.stack,
  });
};
