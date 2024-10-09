import jwt from 'jsonwebtoken';
import express from 'express';

// import { statusCodes } from '../constants.js';
/**
 * @name authenticate
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @description Middleware that verifies the user login by jwt verify,if not will be forwarded to errorHandler middleware
 */
const authenticate = (req, res, next) => {
  const cookie = req.cookies.authToken;
  if (cookie) {
    jwt.verify(cookie, process.env.JWTSECRET, (error, data) => {
      if (error) {
        next(error);
      } else {
        return next();
      }
    });
  } else {
    res.json({ message: 'Need to login' });
  }
};

export default authenticate;
