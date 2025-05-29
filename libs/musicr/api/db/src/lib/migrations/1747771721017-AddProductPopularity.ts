import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddProductPopularity1747771721017 implements MigrationInterface {
  name = 'AddProductPopularity1747771721017';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "products" ADD "popularity" integer`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "popularity"`);
  }
}
