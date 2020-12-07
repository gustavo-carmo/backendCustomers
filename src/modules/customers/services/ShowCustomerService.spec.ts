import AppError from '@shared/errors/AppError';
import FakeCustomersRepository from '../repositories/fakes/FakeCustomersRepository';
import ShowCustomerService from './ShowCustomerService';

let fakeCustomersRepository: FakeCustomersRepository;
let showCustomersService: ShowCustomerService;

describe('ShowCustomer', () => {
  beforeEach(() => {
    fakeCustomersRepository = new FakeCustomersRepository();

    showCustomersService = new ShowCustomerService(fakeCustomersRepository);
  });

  it('should be able to show customer', async () => {
    const customer = await fakeCustomersRepository.create({
      name: 'Customer Test',
      email: 'customer@test.com',
    });

    const customerRecovered = await showCustomersService.execute(customer.id);

    expect(customerRecovered).toHaveProperty('id');
    expect(customer.name).toBe('Customer Test');
    expect(customer.email).toBe('customer@test.com');
  });

  it('should not to be able to show an inexistent customer', async () => {
    await expect(
      showCustomersService.execute('fake-customer-id'),
    ).rejects.toBeInstanceOf(AppError);
  });
});
