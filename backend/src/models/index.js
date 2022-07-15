/* eslint-disable */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import Sequelize from 'sequelize';
const basename = path.basename(__filename);
import dbConnection from '../database/dbConnection.js';

const sequelize = dbConnection;

const models = {};

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
    );
  })
  .forEach(async (file) => {
    let modelDiscovery = await import(path.join(__dirname, file));
    const model = modelDiscovery.default(sequelize, Sequelize.DataTypes);
    models[model.name] = model;
  });

Object.keys(models).forEach((modelName) => {
  if (models[modelName].associate) {
    models[modelName].associate(models);
  }
});

models.dbConnection = dbConnection;
models.sequelize = sequelize;
models.Sequelize = Sequelize;

export default models;
