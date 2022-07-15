import { apiResponse } from '../utils/index.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import models from '../models/index.js';

export default class AuthController {
  static signIn = async (request, response) => {
    try {
      const { username, password } = request.body;
      if (!username || !password) {
        apiResponse.error(response, {
          message: 'Content can not be empty!',
        });
        return;
      }
      const user = await models.User.findOne({ where: { username: username } });
      if (!user) {
        apiResponse.error(response, {
          status: 404,
          message: 'User not found.',
        });
      }
      const mathPasswords = await bcrypt.compare(password, user.password);
      if (!mathPasswords) {
        apiResponse.error(response, {
          status: 401,
          message: 'Incorret password or username.',
        });
      }
      const token = jwt.sign(
        {
          subject: user,
          expiresIn: process.env.TOKEN_EXPIRATION,
        },
        process.env.TOKEN_SECRET,
      );
      apiResponse.success(response, { data: { user: user, token: token } });
    } catch (error) {
      apiResponse.error(response, {
        status: 500,
        message: error.message,
      });
    }
  };
}
