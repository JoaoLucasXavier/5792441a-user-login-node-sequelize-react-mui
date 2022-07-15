import dotenv from 'dotenv';
import express from 'express';
import router from '../router/index.js';
import server from '../config/server.js';
import models from '../models/index.js';
import cors from 'cors';

dotenv.config();

//  Express
const app = express();
app.use(cors());
app.use(express.json());

// Models
models.dbConnection.sync().then(() => {});

// Routes
router(app);
app.get('/', (request, response) => {
  response.send('User Login');
});

// Server
app.listen(server.APP_PORT, () => {
  console.log(`Project listening at http://localhost:${server.APP_PORT}`);
});
