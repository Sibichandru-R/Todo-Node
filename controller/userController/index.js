import { statusCodes } from '../../constants.js';
import express from 'express';
import { verifyUser } from '../../dao/user.js';
import jwt from 'jsonwebtoken';
import authenticate from '../../middlewares/authenticate.js';
/**
 * @name login
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @description Function that takes username and password from the request body and verifies user. If cookie present will try to authenticate else check for password and then sign a jwt token
 */
export const login = (req, res, next) => {
  const { name, password } = req.body;
  const cookie = req.cookies.authToken;
  if (!cookie) {
    if (name) {
      const verifyUserResponse = verifyUser(name, password);
      if (verifyUserResponse.status === 200) {
        const jwtEncoded = jwt.sign({ name, password }, process.env.JWTSECRET);
        res
          .status(statusCodes.success)
          .cookie('authToken', jwtEncoded)
          .json({ message: 'Logged in Successfully' });
      } else {
        res
          .status(statusCodes.notFound)
          .json({ message: 'Invalid Credentials' });
      }
    } else {
      res
        .status(statusCodes.notFound)
        .json({ message: 'No credentials Found' });
    }
  } else {
    authenticate(req, res, next);
    res.status(statusCodes.success).json({ message: 'Logged in Successfully' });
  }
};
