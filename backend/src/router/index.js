import UserRouter from './UserRouter.js';
import AuthRouter from './AuthRouter.js';

export default (app) => {
  UserRouter(app);
  AuthRouter(app);
};
