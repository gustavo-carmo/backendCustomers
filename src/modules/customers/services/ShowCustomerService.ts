import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ICustomersRepository from '../repositories/ICustomersRepository';

import Customer from '../typeorm/schemas/Customer';

@injectable()
class UpdateCustomerService {
  constructor(
    @inject('CustomersRepository')
    private customersRepository: ICustomersRepository,
  ) {}

  public async execute(id: string): Promise<Customer | undefined> {
    const customer = await this.customersRepository.findById(id);

    if (!customer) {
      throw new AppError('Customer not found.');
    }

    return customer;
  }
}

export default UpdateCustomerService;
