import { Router } from 'express';

import sessionAuthenticatedMiddleware from '@modules/users/infra/http/middlewares/SessionAuthenticatedMiddleware';
import ProvidersController from '../controllers/ProvidersController';

const providersRouter = Router();
const providersController = new ProvidersController();

providersRouter.use(sessionAuthenticatedMiddleware);

providersRouter.get('/', providersController.index);

export default providersRouter;
