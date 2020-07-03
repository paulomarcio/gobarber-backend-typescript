import { Router } from 'express';

import sessionAuthenticatedMiddleware from '@modules/users/infra/http/middlewares/SessionAuthenticatedMiddleware';
import AppointmentsController from '../controllers/AppointmentsController';

const appointmentsRouter = Router();
const appointmentsController = new AppointmentsController();

appointmentsRouter.use(sessionAuthenticatedMiddleware);

appointmentsRouter.post('/', appointmentsController.create);

export default appointmentsRouter;
