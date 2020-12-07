import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ICustomersRepository from '../repositories/ICustomersRepository';

import Customer from '../typeorm/schemas/Customer';

interface IRequest {
  id: string;
  name: string;
  email: string;
}

@injectable()
class UpdateCustomerService {
  constructor(
    @inject('CustomersRepository')
    private customersRepository: ICustomersRepository,
  ) {}

  public async execute({
    id,
    name,
    email,
  }: IRequest): Promise<Customer | undefined> {
    const customer = await this.customersRepository.findById(id);

    if (!customer) {
      throw new AppError('Customer not found.');
    }

    // TODO - Change this find to a findByName - The generic find, search by like and we need validate if the name is exactly the same
    let customers = await this.customersRepository.find({
      name,
    });

    const customerWithName = customers.length ? customers[0] : null;

    if (customerWithName && String(customerWithName.id) !== String(id)) {
      throw new AppError('Customer name already in use.');
    }

    // TODO - Change this find to a findByEmail - The generic find, search by like and we need validate if the email is exactly the same
    customers = await this.customersRepository.find({
      email,
    });

    const customerWithAbbreviation = customers.length ? customers[0] : null;

    if (
      customerWithAbbreviation &&
      String(customerWithAbbreviation.id) !== String(id)
    ) {
      throw new AppError('Customer email already in use.');
    }

    Object.assign(customer, { name, email });

    await this.customersRepository.save(customer);

    return customer;
  }
}

export default UpdateCustomerService;
