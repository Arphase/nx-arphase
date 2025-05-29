import { MigrationInterface, QueryRunner } from 'typeorm';

export class NullableVehicleData1610926031951 implements MigrationInterface {
  name = 'NullableVehicleData1610926031951';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "vehicles" ALTER COLUMN "kilometrageStart" DROP NOT NULL`);
    await queryRunner.query(`COMMENT ON COLUMN "vehicles"."kilometrageStart" IS NULL`);
    await queryRunner.query(`ALTER TABLE "vehicles" ALTER COLUMN "kilometrageEnd" DROP NOT NULL`);
    await queryRunner.query(`COMMENT ON COLUMN "vehicles"."kilometrageEnd" IS NULL`);
    await queryRunner.query(`COMMENT ON COLUMN "companies"."rfc" IS NULL`);
    await queryRunner.query(`ALTER TABLE "companies" ADD CONSTRAINT "UQ_c0eaf27eab430da819643655682" UNIQUE ("rfc")`);
    await queryRunner.query(`COMMENT ON COLUMN "users"."rfc" IS NULL`);
    await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "UQ_3dd688f49161bf5d3819b2831bd" UNIQUE ("rfc")`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "UQ_3dd688f49161bf5d3819b2831bd"`);
    await queryRunner.query(`COMMENT ON COLUMN "users"."rfc" IS NULL`);
    await queryRunner.query(`ALTER TABLE "companies" DROP CONSTRAINT "UQ_c0eaf27eab430da819643655682"`);
    await queryRunner.query(`COMMENT ON COLUMN "companies"."rfc" IS NULL`);
    await queryRunner.query(`COMMENT ON COLUMN "vehicles"."kilometrageEnd" IS NULL`);
    await queryRunner.query(`ALTER TABLE "vehicles" ALTER COLUMN "kilometrageEnd" SET NOT NULL`);
    await queryRunner.query(`COMMENT ON COLUMN "vehicles"."kilometrageStart" IS NULL`);
    await queryRunner.query(`ALTER TABLE "vehicles" ALTER COLUMN "kilometrageStart" SET NOT NULL`);
  }
}
