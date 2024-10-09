import { statusCodes } from '../constants.js';
import express from 'express';
import logger from './logger.js';
/**
 *
 * @param {Error} error
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
const errorHandler = (error, req, res, next) => {
  const errorMessage = error.message || 'Something went wrong';
  res.status(statusCodes.internalServerError).json({
    status: statusCodes.internalServerError,
    message: errorMessage,
    stack: error.stack,
  });
  logger.error({ message: errorMessage, stack: error.stack });
};
export default errorHandler;
