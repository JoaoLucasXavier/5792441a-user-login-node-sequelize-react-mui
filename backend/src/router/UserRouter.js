import { Router } from 'express';
import UserController from '../controllers/UserController.js';
import auth from '../middlewares/auth.js';

export default (app) => {
  const router = Router();

  router.get('/', auth, UserController.findAll);
  router.get('/:id', UserController.findOne);
  router.post('/', UserController.create);
  router.put('/:id', UserController.update);
  router.delete('/:id', UserController.deleteOne);
  router.delete('/', UserController.deleteAll);

  app.use('/users', router);
};
