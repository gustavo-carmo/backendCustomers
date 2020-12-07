import { injectable, inject } from 'tsyringe';

import ICustomersRepository from '../repositories/ICustomersRepository';

import Customer from '../typeorm/schemas/Customer';

interface IRequest {
  name?: string;
  defaulting_date_start?: Date;
}

@injectable()
class ListCustomerService {
  constructor(
    @inject('CustomersRepository')
    private customersRepository: ICustomersRepository,
  ) {}

  public async execute({
    name,
    defaulting_date_start,
  }: IRequest): Promise<Customer[]> {
    const customers = await this.customersRepository.find({
      name,
      defaulting_date_start,
    });

    return customers;
  }
}

export default ListCustomerService;
