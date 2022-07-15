import { apiResponse } from '../utils/index.js';
import bcrypt from 'bcryptjs';
import models from '../models/index.js';

export default class UserController {
  static findAll = async (request, response) => {
    try {
      const { name } = request.query;
      const condition = name
        ? { name: { [models.Op.like]: `%${name}%` } }
        : null;
      const users = await models.User.findAll({ where: condition });
      apiResponse.success(response, { data: users });
    } catch (error) {
      apiResponse.error(response, {
        status: 500,
        message: error.message,
      });
    }
  };

  static findOne = async (request, response) => {
    try {
      const { id } = request.params;
      const user = await models.User.findByPk(id);
      apiResponse.success(response, { data: user });
    } catch (error) {
      apiResponse.error(response, {
        status: 500,
        message: error.message,
      });
    }
  };

  static create = async (request, response) => {
    try {
      const { name, username, password, active } = request.body;
      if (!name || !username || !password || !active) {
        apiResponse.error(response, {
          message: 'Content can not be empty!',
        });
        return;
      }
      const passwordHashed = await bcrypt.hash(password, 8);
      const user = await models.User.create({
        name,
        username,
        password: passwordHashed,
        active,
      });
      apiResponse.success(response, { data: user });
    } catch (error) {
      apiResponse.error(response, {
        status: 500,
        message: error.message,
      });
    }
  };

  static update = async (request, response) => {
    try {
      const { id } = request.params;
      const userToUpdate = await models.User.findByPk(id);
      if (!userToUpdate) {
        apiResponse.error(response, {
          status: 404,
          message: 'User not found.',
        });
        return;
      }
      const { name, username, password, active } = request.body;
      if (
        !(typeof name !== 'undefined' && name) ||
        !(typeof username !== 'undefined' && username) ||
        !(typeof password !== 'undefined' && password) ||
        !(typeof active !== 'undefined' && active)
      ) {
        apiResponse.error(response, { message: 'Content can not be empty!' });
        return;
      }
      const user = await models.User.update(
        { ...request.body },
        {
          where: {
            id: userToUpdate.id,
          },
        },
      );
      apiResponse.success(response, { data: user });
    } catch (error) {
      apiResponse.error(response, {
        status: 500,
        message: error.message,
      });
    }
  };

  static deleteOne = async (request, response) => {
    try {
      const { id } = request.params;
      const userToUpdate = await models.User.findByPk(id);
      if (!userToUpdate) {
        apiResponse.error(response, {
          status: 404,
          message: 'User not found.',
        });
        return;
      }
      const user = await models.User.destroy({
        where: {
          id: userToUpdate.id,
        },
      });
      apiResponse.success(response, { data: user });
    } catch (error) {
      apiResponse.error(response, {
        status: 500,
        message: error.message,
      });
    }
  };

  static deleteAll = async (request, response) => {
    try {
      const user = await models.User.destroy({
        where: {},
        truncate: true,
      });
      apiResponse.success(response, { data: user });
    } catch (error) {
      apiResponse.error(response, {
        status: 500,
        message: error.message,
      });
    }
  };
}
