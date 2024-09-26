import user from './user.json' assert { type: 'json' };
import { statusCodes } from '../constants.js';

export const verifyUser = (username, password) => {
  const index = user.findIndex((user) => user.name === username);
  if (index >= 0 && user[index].password == password) {
    return { status: statusCodes.success };
  }
  return { status: statusCodes.notFound };
};
