import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddStatusToOrder1670610792923 implements MigrationInterface {
  name = 'AddStatusToOrder1670610792923';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "orders" ADD "status" "public"."orders_status_enum" NOT NULL DEFAULT 'quoted'`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "status"`);
  }
}
