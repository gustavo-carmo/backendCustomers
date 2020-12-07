import { Router } from 'express';
import customersRouter from '@modules/customers/routes/customers.routes';

const routes = Router();

routes.use('/customers', customersRouter);

export default routes;
