import { MigrationInterface, QueryRunner } from 'typeorm';

export default class CreateDatabase1607514098429 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createDatabase('financial_system');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropDatabase('financial_system');
  }
}
