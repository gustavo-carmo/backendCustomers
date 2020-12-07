import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListCustomerService from '@modules/customers/services/ListCustomerService';
import ShowCustomerService from '@modules/customers/services/ShowCustomerService';
// import CreateCustomerService from '@modules/customers/services/CreateCustomerService';
// import UpdateCustomerService from '@modules/customers/services/UpdateCustomerService';
// import DeleteCustomerService from '@modules/customers/services/DeleteCustomerService';

export default class CustomersController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { name, defaulting_date_start } = request.query;

    const listCustomerService = container.resolve(ListCustomerService);

    const customers = await listCustomerService.execute({
      ...(name ? { name: String(name) } : {}),
      ...(defaulting_date_start
        ? { defaulting_date_start: new Date(String(defaulting_date_start)) }
        : {}),
    });

    return response.json(customers);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showCustomerService = container.resolve(ShowCustomerService);

    const customer = await showCustomerService.execute(id);

    return response.json(customer);
  }

  /*
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, defaulting_date_start } = request.body;

    const createCustomerService = container.resolve(CreateCustomerService);

    const customer = await createCustomerService.execute({
      name,
      defaulting_date_start,
    });

    return response.json(customer);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const { name, defaulting_date_start } = request.body;

    const updateCustomerService = container.resolve(UpdateCustomerService);

    const customer = await updateCustomerService.execute({
      id,
      name,
      defaulting_date_start,
    });

    return response.json(customer);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteCustomerService = container.resolve(DeleteCustomerService);

    await deleteCustomerService.execute(id);

    return response.status(204).json();
  }
  */
}
