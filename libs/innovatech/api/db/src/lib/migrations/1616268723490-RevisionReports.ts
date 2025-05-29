import { MigrationInterface, QueryRunner } from 'typeorm';

export class RevisionReports1616268723490 implements MigrationInterface {
  name = 'RevisionReports1616268723490';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "revisions" ADD "report" jsonb`);
    await queryRunner.query(`ALTER TABLE "revisions" ADD "reviewdBy" character varying`);
    await queryRunner.query(`ALTER TABLE "vehicles" ALTER COLUMN "version" DROP NOT NULL`);
    await queryRunner.query(`COMMENT ON COLUMN "vehicles"."version" IS NULL`);
    await queryRunner.query(`ALTER TABLE "vehicles" ALTER COLUMN "year" DROP NOT NULL`);
    await queryRunner.query(`COMMENT ON COLUMN "vehicles"."year" IS NULL`);
    await queryRunner.query(`ALTER TABLE "vehicles" ALTER COLUMN "motorNumber" DROP NOT NULL`);
    await queryRunner.query(`COMMENT ON COLUMN "vehicles"."motorNumber" IS NULL`);
    await queryRunner.query(`ALTER TYPE "public"."vehicles_status_enum" RENAME TO "vehicles_status_enum_old"`);
    await queryRunner.query(`CREATE TYPE "vehicles_status_enum" AS ENUM('1', '2', '3', '4', '5')`);
    await queryRunner.query(`ALTER TABLE "vehicles" ALTER COLUMN "status" DROP DEFAULT`);
    await queryRunner.query(
      `ALTER TABLE "vehicles" ALTER COLUMN "status" TYPE "vehicles_status_enum" USING "status"::"text"::"vehicles_status_enum"`,
    );
    await queryRunner.query(`ALTER TABLE "vehicles" ALTER COLUMN "status" SET DEFAULT '2'`);
    await queryRunner.query(`DROP TYPE "vehicles_status_enum_old"`);
    await queryRunner.query(`COMMENT ON COLUMN "vehicles"."status" IS NULL`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`COMMENT ON COLUMN "vehicles"."status" IS NULL`);
    await queryRunner.query(`CREATE TYPE "vehicles_status_enum_old" AS ENUM('1', '2', '3', '4')`);
    await queryRunner.query(`ALTER TABLE "vehicles" ALTER COLUMN "status" DROP DEFAULT`);
    await queryRunner.query(
      `ALTER TABLE "vehicles" ALTER COLUMN "status" TYPE "vehicles_status_enum_old" USING "status"::"text"::"vehicles_status_enum_old"`,
    );
    await queryRunner.query(`ALTER TABLE "vehicles" ALTER COLUMN "status" SET DEFAULT '2'`);
    await queryRunner.query(`DROP TYPE "vehicles_status_enum"`);
    await queryRunner.query(`ALTER TYPE "vehicles_status_enum_old" RENAME TO  "vehicles_status_enum"`);
    await queryRunner.query(`COMMENT ON COLUMN "vehicles"."motorNumber" IS NULL`);
    await queryRunner.query(`ALTER TABLE "vehicles" ALTER COLUMN "motorNumber" SET NOT NULL`);
    await queryRunner.query(`COMMENT ON COLUMN "vehicles"."year" IS NULL`);
    await queryRunner.query(`ALTER TABLE "vehicles" ALTER COLUMN "year" SET NOT NULL`);
    await queryRunner.query(`COMMENT ON COLUMN "vehicles"."version" IS NULL`);
    await queryRunner.query(`ALTER TABLE "vehicles" ALTER COLUMN "version" SET NOT NULL`);
    await queryRunner.query(`ALTER TABLE "revisions" DROP COLUMN "reviewdBy"`);
    await queryRunner.query(`ALTER TABLE "revisions" DROP COLUMN "report"`);
  }
}
