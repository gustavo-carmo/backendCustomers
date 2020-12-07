import { getRepository, MoreThan, Repository } from 'typeorm';

import ICreateCustomerDTO from '@modules/customers/dtos/ICreateCustomerDTO';
import ICustomersRepository from '@modules/customers/repositories/ICustomersRepository';

import Customer from '@modules/customers/typeorm/schemas/Customer';
import IFindCustomerDTO from '@modules/customers/dtos/IFindCustomerDTO';

class CustomersRepository implements ICustomersRepository {
  private ormRepository: Repository<Customer>;

  constructor() {
    this.ormRepository = getRepository(Customer);
  }

  public async findById(id: string): Promise<Customer | undefined> {
    const customer = await this.ormRepository.findOne({
      where: {
        _id: id,
      },
    });

    return customer;
  }

  public async find({
    name,
    defaulting_date_start,
  }: IFindCustomerDTO): Promise<Customer[]> {
    const querySearch = {};

    if (name) {
      // Object.assign(querySearch, { name: Like(`${name}`) });
      Object.assign(querySearch, { name });
    }

    if (defaulting_date_start) {
      Object.assign(querySearch, {
        defaulting_date_start: MoreThan(defaulting_date_start),
      });
    }

    const customers = await this.ormRepository.find({
      where: querySearch,
    });

    return customers;
  }

  public async create({
    name,
    defaulting_date_start,
  }: ICreateCustomerDTO): Promise<Customer> {
    const customer = this.ormRepository.create({
      name,
      defaulting_date_start,
    });

    await this.ormRepository.save(customer);

    return customer;
  }

  public async findByName(name: string): Promise<Customer | undefined> {
    const customer = await this.ormRepository.findOne({
      where: {
        name,
      },
    });

    return customer;
  }

  public async save(customer: Customer): Promise<Customer> {
    return this.ormRepository.save(customer);
  }

  public async delete(customer: Customer): Promise<void> {
    await this.ormRepository.remove(customer);
  }
}

export default CustomersRepository;
