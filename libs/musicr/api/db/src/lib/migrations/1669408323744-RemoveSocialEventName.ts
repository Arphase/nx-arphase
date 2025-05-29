import { MigrationInterface, QueryRunner } from 'typeorm';

export class RemoveSocialEventName1669408323744 implements MigrationInterface {
  name = 'RemoveSocialEventName1669408323744';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "socialEvents" DROP COLUMN "name"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "socialEvents" ADD "name" character varying`);
  }
}
