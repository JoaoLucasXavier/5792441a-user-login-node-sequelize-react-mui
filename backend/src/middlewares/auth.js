import jwt from 'jsonwebtoken';
import { apiResponse } from '../utils/index.js';

export default (request, response, next) => {
  const authHeader = request?.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    apiResponse.error(response, {
      status: 404,
      message: 'Token not found.',
    });
  }

  jwt.verify(token, process.env.TOKEN_SECRET, (error, user) => {
    if (error) {
      apiResponse.error(response, {
        status: 401,
        message: 'Invalid token.',
      });
    }
    request.user = user;
    next();
  });
};
