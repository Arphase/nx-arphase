import { MigrationInterface, QueryRunner } from 'typeorm';

export class SupportQuoteOrders1664490607405 implements MigrationInterface {
  name = 'SupportQuoteOrders1664490607405';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TYPE "public"."orders_ordertype_enum" AS ENUM('quote', 'purchase')`);
    await queryRunner.query(
      `ALTER TABLE "orders" ADD "orderType" "public"."orders_ordertype_enum" NOT NULL DEFAULT 'purchase'`,
    );
    await queryRunner.query(`ALTER TABLE "addresses" ALTER COLUMN "country" DROP NOT NULL`);
    await queryRunner.query(`ALTER TABLE "addresses" ALTER COLUMN "state" DROP NOT NULL`);
    await queryRunner.query(`ALTER TABLE "addresses" ALTER COLUMN "city" DROP NOT NULL`);
    await queryRunner.query(`ALTER TABLE "addresses" ALTER COLUMN "suburb" DROP NOT NULL`);
    await queryRunner.query(`ALTER TABLE "addresses" ALTER COLUMN "street" DROP NOT NULL`);
    await queryRunner.query(`ALTER TABLE "addresses" ALTER COLUMN "externalNumber" DROP NOT NULL`);
    await queryRunner.query(`ALTER TABLE "socialEvents" ALTER COLUMN "name" DROP NOT NULL`);
    await queryRunner.query(`ALTER TABLE "socialEvents" ALTER COLUMN "eventType" DROP NOT NULL`);
    await queryRunner.query(`ALTER TABLE "socialEvents" ALTER COLUMN "eventPlace" DROP NOT NULL`);
    await queryRunner.query(`ALTER TABLE "socialEvents" ALTER COLUMN "requiresAssembly" DROP NOT NULL`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "socialEvents" ALTER COLUMN "requiresAssembly" SET NOT NULL`);
    await queryRunner.query(`ALTER TABLE "socialEvents" ALTER COLUMN "eventPlace" SET NOT NULL`);
    await queryRunner.query(`ALTER TABLE "socialEvents" ALTER COLUMN "eventType" SET NOT NULL`);
    await queryRunner.query(`ALTER TABLE "socialEvents" ALTER COLUMN "name" SET NOT NULL`);
    await queryRunner.query(`ALTER TABLE "addresses" ALTER COLUMN "externalNumber" SET NOT NULL`);
    await queryRunner.query(`ALTER TABLE "addresses" ALTER COLUMN "street" SET NOT NULL`);
    await queryRunner.query(`ALTER TABLE "addresses" ALTER COLUMN "suburb" SET NOT NULL`);
    await queryRunner.query(`ALTER TABLE "addresses" ALTER COLUMN "city" SET NOT NULL`);
    await queryRunner.query(`ALTER TABLE "addresses" ALTER COLUMN "state" SET NOT NULL`);
    await queryRunner.query(`ALTER TABLE "addresses" ALTER COLUMN "country" SET NOT NULL`);
    await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "orderType"`);
    await queryRunner.query(`DROP TYPE "public"."orders_ordertype_enum"`);
  }
}
