import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import { ObjectID } from 'mongodb';
import ICustomersRepository from '../repositories/ICustomersRepository';

@injectable()
class CreateCustomerService {
  constructor(
    @inject('CustomersRepository')
    private customersRepository: ICustomersRepository,
  ) {}

  public async execute(id: string): Promise<void> {
    const customer = await this.customersRepository.findById(id);

    if (!customer) {
      throw new AppError('Customer not found.');
    }

    await this.customersRepository.delete(customer);
  }
}

export default CreateCustomerService;
