import { Router } from 'express';
import AuthController from '../controllers/AuthController.js';

export default (app) => {
  const router = Router();

  router.post('/', AuthController.signIn);

  app.use('/login', router);
};
