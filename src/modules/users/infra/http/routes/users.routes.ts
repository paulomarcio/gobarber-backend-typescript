import { Router } from 'express';
import multer from 'multer';

import storageConfig from '@config/storage';

import sessionAuthenticatedMiddleware from '@modules/users/infra/http/middlewares/SessionAuthenticatedMiddleware';

import UsersController from '../controllers/UsersController';
import UserAvatarController from '../controllers/UserAvatarController';

const usersRouter = Router();
const usersController = new UsersController();
const userAvatarController = new UserAvatarController();

const storage = multer(storageConfig);

usersRouter.post('/', usersController.create);

usersRouter.patch(
  '/avatar',
  sessionAuthenticatedMiddleware,
  storage.single('avatar'),
  userAvatarController.update
);

export default usersRouter;
