import ICreateCustomerDTO from '../dtos/ICreateCustomerDTO';
import IFindCustomerDTO from '../dtos/IFindCustomerDTO';
import Customer from '../typeorm/schemas/Customer';

export default interface ICustomersRepository {
  create(date: ICreateCustomerDTO): Promise<Customer>;
  findById(id: string): Promise<Customer | undefined>;
  find(date: IFindCustomerDTO): Promise<Customer[]>;
  save(customer: Customer): Promise<Customer>;
  delete(customer: Customer): Promise<void>;
}
