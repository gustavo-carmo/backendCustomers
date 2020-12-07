import FakeCustomersRepository from '../repositories/fakes/FakeCustomersRepository';
import ListCustomerService from './ListCustomerService';

let fakeCustomersRepository: FakeCustomersRepository;
let listCustomersService: ListCustomerService;

describe('ListCustomer', () => {
  beforeEach(() => {
    fakeCustomersRepository = new FakeCustomersRepository();

    listCustomersService = new ListCustomerService(fakeCustomersRepository);
  });

  it('should be able to list customers', async () => {
    const customer1 = await fakeCustomersRepository.create({
      name: 'São Paulo',
      email: 'SP',
    });

    const customer2 = await fakeCustomersRepository.create({
      name: 'Santa Catarina',
      email: 'SC',
    });

    const customers = await listCustomersService.execute({});

    expect(customers).toEqual([customer1, customer2]);
    // TODO CREATE TESTS TO VALIDATE THE LIKE
  });
});
