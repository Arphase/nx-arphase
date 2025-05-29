import { MigrationInterface, QueryRunner } from 'typeorm';

export class StringZipCodeOnAddress1600116994742 implements MigrationInterface {
  name = 'StringZipCodeOnAddress1600116994742';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "addresses" DROP COLUMN "zipCode"`);
    await queryRunner.query(`ALTER TABLE "addresses" ADD "zipCode" character varying NOT NULL`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "addresses" DROP COLUMN "zipCode"`);
    await queryRunner.query(`ALTER TABLE "addresses" ADD "zipCode" integer NOT NULL`);
  }
}
