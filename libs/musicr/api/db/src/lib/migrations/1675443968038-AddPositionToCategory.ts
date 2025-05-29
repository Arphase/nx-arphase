import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddPositionToCategory1675443968038 implements MigrationInterface {
  name = 'AddPositionToCategory1675443968038';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "categories" ADD "position" integer`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "categories" DROP COLUMN "position"`);
  }
}
