import { Router } from 'express';

import sessionAuthenticatedMiddleware from '@modules/users/infra/http/middlewares/SessionAuthenticatedMiddleware';
import ProvidersController from '../controllers/ProvidersController';
import ProviderDayAvailabilityController from '../controllers/ProviderDayAvailabilityController';
import ProviderMonthAvailabilityController from '../controllers/ProviderMonthAvailabilityController';

const providersRouter = Router();
const providersController = new ProvidersController();
const providerDayAvailabilityController = new ProviderDayAvailabilityController();
const providerMonthAvailabilityController = new ProviderMonthAvailabilityController();

providersRouter.use(sessionAuthenticatedMiddleware);

providersRouter.get('/', providersController.index);
providersRouter.get(
  '/:provider_id/month-availability',
  providerMonthAvailabilityController.index
);
providersRouter.get(
  '/:provider_id/day-availability',
  providerDayAvailabilityController.index
);

export default providersRouter;
