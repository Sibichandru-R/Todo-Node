import { statusCodes } from '../constants.js';
import express from 'express';
/**
 *
 * @param {Error} error
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
export const errorHandler = (error, req, res, next) => {
  console.log('first');
  const errorMessage = error.message || 'Something went wrong';
  res.status(statusCodes.internalServerError).json({
    status: statusCodes.internalServerError,
    message: errorMessage,
    stack: error.stack,
  });
  next();
};

export const nxtHandler = (req, res, next) => {
  console.log('nxthandler');
  // next(error)
};
