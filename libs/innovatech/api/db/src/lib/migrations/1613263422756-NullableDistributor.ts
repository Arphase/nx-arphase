import { MigrationInterface, QueryRunner } from 'typeorm';

export class NullableDistributor1613263422756 implements MigrationInterface {
  name = 'NullableDistributor1613263422756';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "paymentOrders" ALTER COLUMN "distributor" DROP NOT NULL`);
    await queryRunner.query(`COMMENT ON COLUMN "paymentOrders"."distributor" IS NULL`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`COMMENT ON COLUMN "paymentOrders"."distributor" IS NULL`);
    await queryRunner.query(`ALTER TABLE "paymentOrders" ALTER COLUMN "distributor" SET NOT NULL`);
  }
}
