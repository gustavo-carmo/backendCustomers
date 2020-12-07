import AppError from '@shared/errors/AppError';
import FakeCustomersRepository from '../repositories/fakes/FakeCustomersRepository';
import DeleteCustomerService from './DeleteCustomerService';

let fakeCustomersRepository: FakeCustomersRepository;
let deleteCustomersService: DeleteCustomerService;

describe('DeleteCustomer', () => {
  beforeEach(() => {
    fakeCustomersRepository = new FakeCustomersRepository();

    deleteCustomersService = new DeleteCustomerService(fakeCustomersRepository);
  });

  it('should be able to delete customer', async () => {
    const customer = await fakeCustomersRepository.create({
      name: 'São Paulo',
      email: 'SP',
    });

    const customer2 = await fakeCustomersRepository.create({
      name: 'Santa Catarina',
      email: 'SC',
    });

    await deleteCustomersService.execute(customer.id);

    const customers = await fakeCustomersRepository.find({});

    expect(customers).toEqual(expect.arrayContaining([customer2]));
  });

  it('should not be able to delete an inexistent customer', async () => {
    await expect(
      deleteCustomersService.execute('fake-customer-id'),
    ).rejects.toBeInstanceOf(AppError);
  });
});
