import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ICustomersRepository from '../repositories/ICustomersRepository';

import Customer from '../typeorm/schemas/Customer';

interface IRequest {
  name: string;
  email: string;
}

@injectable()
class CreateCustomerService {
  constructor(
    @inject('CustomersRepository')
    private customersRepository: ICustomersRepository,
  ) {}

  public async execute({
    name,
    email,
  }: IRequest): Promise<Customer | undefined> {
    // TODO - Change this find to a findByName - The generic find, search by like and we need validate if the name is exactly the same
    let customers = await this.customersRepository.find({ name });
    let checkCustomerExists = customers.length ? customers[0] : null;

    if (checkCustomerExists) {
      throw new AppError('Customer already created.');
    }

    // TODO - Change this find to a findByEmail - The generic find, search by like and we need validate if the email is exactly the same
    customers = await this.customersRepository.find({ email });
    checkCustomerExists = customers.length ? customers[0] : null;

    if (checkCustomerExists) {
      throw new AppError('Customer already created.');
    }

    const customer = await this.customersRepository.create({
      name,
      email,
    });

    return customer;
  }
}

export default CreateCustomerService;
