import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import CustomersController from '../controllers/CustomersController';

const customersRouter = Router();
const customersController = new CustomersController();

customersRouter.get(
  '/',
  celebrate({
    [Segments.QUERY]: {
      name: Joi.string().empty(),
      defaulting_date_start: Joi.date(),
    },
  }),
  customersController.index,
);

customersRouter.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().required(),
    },
  }),
  customersController.show,
);

/*
customersRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      defaulting_date_start: Joi.string().required().defaulting_date_start(),
    },
  }),
  customersController.create,
);

customersRouter.put(
  '/:id',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      defaulting_date_start: Joi.string().required().defaulting_date_start(),
    },
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  customersController.update,
);

customersRouter.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  customersController.delete,
);
*/

export default customersRouter;
