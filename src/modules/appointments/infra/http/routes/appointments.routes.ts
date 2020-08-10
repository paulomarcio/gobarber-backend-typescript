import { Router } from 'express';

import sessionAuthenticatedMiddleware from '@modules/users/infra/http/middlewares/SessionAuthenticatedMiddleware';
import AppointmentsController from '../controllers/AppointmentsController';
import ProviderAppointmentsController from '../controllers/ProviderAppointmentsController';

const appointmentsRouter = Router();
const appointmentsController = new AppointmentsController();
const providerAppointmentsController = new ProviderAppointmentsController();

appointmentsRouter.use(sessionAuthenticatedMiddleware);

appointmentsRouter.post('/', appointmentsController.create);
appointmentsRouter.get('/me', providerAppointmentsController.index);

export default appointmentsRouter;
