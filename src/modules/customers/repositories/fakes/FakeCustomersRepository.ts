import ICreateCustomerDTO from '@modules/customers/dtos/ICreateCustomerDTO';
import ICustomersRepository from '@modules/customers/repositories/ICustomersRepository';

import Customer from '@modules/customers/typeorm/schemas/Customer';
import IFindCustomerDTO from '@modules/customers/dtos/IFindCustomerDTO';
import { uuid } from 'uuidv4';

class FakeCustomersRepository implements ICustomersRepository {
  private customers: Customer[] = [];

  public async create({ name, email }: ICreateCustomerDTO): Promise<Customer> {
    const customer = new Customer();

    Object.assign(customer, { id: uuid(), name, email });

    this.customers.push(customer);

    return customer;
  }

  public async findById(id: string): Promise<Customer | undefined> {
    return this.customers.find((customer) => customer.id === id);
  }

  public async save(customer: Customer): Promise<Customer> {
    const customerIndex = this.customers.findIndex(
      (findCustomer) => findCustomer.id === customer.id,
    );

    this.customers[customerIndex] = customer;

    return customer;
  }

  public async delete(customer: Customer): Promise<void> {
    const customerIndex = this.customers.findIndex(
      (findCustomer) => findCustomer.id === customer.id,
    );

    this.customers.splice(customerIndex, 1);
  }

  public async find({ name, email }: IFindCustomerDTO): Promise<Customer[]> {
    return this.customers.filter(
      (customer) =>
        (name && customer.name === name) ||
        (email && customer.email === email) ||
        (!name && !email && customer),
    );
  }
}

export default FakeCustomersRepository;
