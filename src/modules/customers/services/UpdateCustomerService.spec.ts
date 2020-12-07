import AppError from '@shared/errors/AppError';
import FakeCustomersRepository from '../repositories/fakes/FakeCustomersRepository';
import UpdateCustomerService from './UpdateCustomerService';

let fakeCustomersRepository: FakeCustomersRepository;
let updateCustomersService: UpdateCustomerService;

describe('UpdateCustomer', () => {
  beforeEach(() => {
    fakeCustomersRepository = new FakeCustomersRepository();

    updateCustomersService = new UpdateCustomerService(fakeCustomersRepository);
  });

  it('should be able to update customer', async () => {
    const customer = await fakeCustomersRepository.create({
      name: 'São Paulo',
      email: 'SP',
    });

    await updateCustomersService.execute({
      id: customer.id,
      name: 'Novo Estado',
      email: 'TT',
    });

    expect(customer).toHaveProperty('id');
    expect(customer.name).toBe('Novo Estado');
    expect(customer.email).toBe('TT');
  });

  it('should not to be able to update an inexistent customer', async () => {
    await expect(
      updateCustomersService.execute({
        id: 'fake-customer-id',
        name: 'São Paulo',
        email: 'TT',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not to be able to update customer', async () => {
    await fakeCustomersRepository.create({
      name: 'São Paulo',
      email: 'SP',
    });

    const customer = await fakeCustomersRepository.create({
      name: 'Santa Catarina',
      email: 'SC',
    });

    await expect(
      updateCustomersService.execute({
        id: customer.id,
        name: 'São Paulo',
        email: 'TT',
      }),
    ).rejects.toBeInstanceOf(AppError);

    await expect(
      updateCustomersService.execute({
        id: customer.id,
        name: 'Santa Catarina',
        email: 'SP',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
