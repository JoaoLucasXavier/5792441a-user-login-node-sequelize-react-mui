import Sequelize from 'sequelize';
import DatabaseConfig from '../config/db.js';

const dbConnection = new Sequelize(DatabaseConfig);

try {
  dbConnection.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}

export default dbConnection;
