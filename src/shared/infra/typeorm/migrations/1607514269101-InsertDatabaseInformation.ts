import { MigrationInterface, QueryRunner, IsNull, Not } from 'typeorm';

import Customer from '@modules/customers/typeorm/schemas/Customer';

interface ICustomerDTO {
  name: string;
  defaulting_value: number;
  defaulting_date_start: Date;
  status: 'OK' | 'DEFAULTING';
  created_at: Date;
  updated_at: Date;
}

export default class InsertDatabaseInformation1607290674752
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const customers: ICustomerDTO[] = [
      {
        name: 'Benedita Vitória Corte Real',
        defaulting_value: 40000,
        defaulting_date_start: new Date(2020, 8, 3, 11),
        status: 'DEFAULTING',
        created_at: new Date(2020, 8, 3, 11),
        updated_at: new Date(),
      },
      {
        name: 'Joaquim Oliver Breno da Rocha',
        defaulting_value: 15000,
        defaulting_date_start: new Date(2020, 8, 10, 11),
        status: 'DEFAULTING',
        created_at: new Date(2020, 8, 10, 11),
        updated_at: new Date(),
      },
      {
        name: 'Otávio Renan Severino Duarte',
        defaulting_value: 4000,
        defaulting_date_start: new Date(2020, 8, 11, 11),
        status: 'DEFAULTING',
        created_at: new Date(2020, 8, 11, 11),
        updated_at: new Date(),
      },
      {
        name: 'Augusto André César Caldeira',
        defaulting_value: 10000,
        defaulting_date_start: new Date(2020, 7, 15, 11),
        status: 'DEFAULTING',
        created_at: new Date(2020, 7, 15, 11),
        updated_at: new Date(),
      },
      {
        name: 'Anderson Cláudio da Silva',
        defaulting_value: 1500,
        defaulting_date_start: new Date(2020, 8, 10, 11),
        status: 'DEFAULTING',
        created_at: new Date(2020, 8, 10, 11),
        updated_at: new Date(),
      },
      {
        name: 'Sophia Tereza Laura Rodrigues',
        defaulting_value: 97000,
        defaulting_date_start: new Date(2020, 8, 20, 20),
        status: 'DEFAULTING',
        created_at: new Date(2020, 8, 20, 20),
        updated_at: new Date(),
      },
      {
        name: 'Cláudio Rafael dos Santos',
        defaulting_value: 23000,
        defaulting_date_start: new Date(2020, 8, 27, 11),
        status: 'DEFAULTING',
        created_at: new Date(2020, 8, 27, 11),
        updated_at: new Date(),
      },
      {
        name: 'Olivia Helena Rocha',
        defaulting_value: 1900,
        defaulting_date_start: new Date(2020, 8, 22, 11),
        status: 'DEFAULTING',
        created_at: new Date(2020, 8, 22, 11),
        updated_at: new Date(),
      },
      {
        name: 'Matheus Lucas Renato da Silva',
        defaulting_value: 4000,
        defaulting_date_start: new Date(2020, 8, 11, 11),
        status: 'DEFAULTING',
        created_at: new Date(2020, 8, 11, 11),
        updated_at: new Date(),
      },
    ];

    customers.forEach(async (customer) => {
      await queryRunner.manager.insert(Customer, customer);
    });
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager
      .createQueryBuilder()
      .delete()
      .from(Customer)
      .where({
        _id: Not(IsNull()),
      });
  }
}
