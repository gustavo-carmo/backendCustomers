import AppError from '@shared/errors/AppError';
import FakeCustomersRepository from '../repositories/fakes/FakeCustomersRepository';
import CreateCustomerService from './CreateCustomerService';

let fakeCustomersRepository: FakeCustomersRepository;
let createCustomersService: CreateCustomerService;

describe('CreateCustomer', () => {
  beforeEach(() => {
    fakeCustomersRepository = new FakeCustomersRepository();

    createCustomersService = new CreateCustomerService(fakeCustomersRepository);
  });

  it('should be able to create a new customer', async () => {
    const customer = await createCustomersService.execute({
      name: 'São Paulo',
      email: 'SP',
    });

    expect(customer).toHaveProperty('id');
  });

  it('should not be able to create two customers with same name', async () => {
    await createCustomersService.execute({
      name: 'São Paulo',
      email: 'SP',
    });

    await expect(
      createCustomersService.execute({
        name: 'São Paulo',
        email: 'SC',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create two customers with same name', async () => {
    await createCustomersService.execute({
      name: 'São Paulo',
      email: 'SP',
    });

    await expect(
      createCustomersService.execute({
        name: 'Santa Catarina',
        email: 'SP',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
