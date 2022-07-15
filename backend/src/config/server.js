import dotenv from 'dotenv';
dotenv.config();

export default {
  APP_ENV: process.env.APP_ENV,
  APP_PORT: process.env.APP_PORT,
};
