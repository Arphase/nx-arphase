import { MigrationInterface, QueryRunner } from 'typeorm';

export class RemoveVehicleStatusEnumWithTypo1666139624219 implements MigrationInterface {
  name = 'RemoveVehicleStatusEnumWithTypo1666139624219';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TYPE "public"."vehicles_status_enum" RENAME TO "vehicles_status_enum_old"`);
    await queryRunner.query(
      `CREATE TYPE "public"."vehicles_status_enum" AS ENUM('elegible', 'needsRevision', 'hasActiveGuarantee', 'notElegible', 'soldWithoutGuarantee')`,
    );
    await queryRunner.query(`ALTER TABLE "vehicles" ALTER COLUMN "status" DROP DEFAULT`);
    await queryRunner.query(
      `ALTER TABLE "vehicles" ALTER COLUMN "status" TYPE "public"."vehicles_status_enum" USING "status"::"text"::"public"."vehicles_status_enum"`,
    );
    await queryRunner.query(`ALTER TABLE "vehicles" ALTER COLUMN "status" SET DEFAULT 'needsRevision'`);
    await queryRunner.query(`DROP TYPE "public"."vehicles_status_enum_old"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."vehicles_status_enum_old" AS ENUM('elegible', 'needsRevision', 'hasActiveGuarantee', 'notElegible', 'soldWidhoutGuarantee', 'soldWithoutGuarantee')`,
    );
    await queryRunner.query(`ALTER TABLE "vehicles" ALTER COLUMN "status" DROP DEFAULT`);
    await queryRunner.query(
      `ALTER TABLE "vehicles" ALTER COLUMN "status" TYPE "public"."vehicles_status_enum_old" USING "status"::"text"::"public"."vehicles_status_enum_old"`,
    );
    await queryRunner.query(`ALTER TABLE "vehicles" ALTER COLUMN "status" SET DEFAULT 'needsRevision'`);
    await queryRunner.query(`DROP TYPE "public"."vehicles_status_enum"`);
    await queryRunner.query(`ALTER TYPE "public"."vehicles_status_enum_old" RENAME TO "vehicles_status_enum"`);
  }
}
