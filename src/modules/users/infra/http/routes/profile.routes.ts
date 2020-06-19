import { Router } from 'express';

import sessionAuthenticatedMiddleware from '@modules/users/infra/http/middlewares/SessionAuthenticatedMiddleware';

import ProfileController from '../controllers/ProfileController';

const profileRouter = Router();
const profileController = new ProfileController();

profileRouter.use(sessionAuthenticatedMiddleware);

profileRouter.get('/', profileController.show);
profileRouter.put('/', profileController.update);

export default profileRouter;
