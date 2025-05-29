import { MigrationInterface, QueryRunner } from 'typeorm';

export class MakeRFCOptional1694193023283 implements MigrationInterface {
  name = 'MakeRFCOptional1694193023283';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "clients" ALTER COLUMN "rfc" DROP NOT NULL`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "clients" ALTER COLUMN "rfc" SET NOT NULL`);
  }
}
