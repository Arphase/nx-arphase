import {MigrationInterface, QueryRunner} from "typeorm";

export class VehiclesStatus1612643474507 implements MigrationInterface {
    name = 'VehiclesStatus1612643474507'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`COMMENT ON COLUMN "groups"."name" IS NULL`);
        await queryRunner.query(`ALTER TABLE "groups" ADD CONSTRAINT "UQ_664ea405ae2a10c264d582ee563" UNIQUE ("name")`);
        await queryRunner.query(`ALTER TYPE "public"."vehicles_status_enum" RENAME TO "vehicles_status_enum_old"`);
        await queryRunner.query(`CREATE TYPE "vehicles_status_enum" AS ENUM('1', '2', '3', '4')`);
        await queryRunner.query(`ALTER TABLE "vehicles" ALTER COLUMN "status" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "vehicles" ALTER COLUMN "status" TYPE "vehicles_status_enum" USING "status"::"text"::"vehicles_status_enum"`);
        await queryRunner.query(`ALTER TABLE "vehicles" ALTER COLUMN "status" SET DEFAULT '2'`);
        await queryRunner.query(`DROP TYPE "vehicles_status_enum_old"`);
        await queryRunner.query(`COMMENT ON COLUMN "vehicles"."status" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "companies"."businessName" IS NULL`);
        await queryRunner.query(`ALTER TABLE "companies" ADD CONSTRAINT "UQ_2abdc0ebdcb88fef08b7af03349" UNIQUE ("businessName")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "companies" DROP CONSTRAINT "UQ_2abdc0ebdcb88fef08b7af03349"`);
        await queryRunner.query(`COMMENT ON COLUMN "companies"."businessName" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "vehicles"."status" IS NULL`);
        await queryRunner.query(`CREATE TYPE "vehicles_status_enum_old" AS ENUM('1', '2')`);
        await queryRunner.query(`ALTER TABLE "vehicles" ALTER COLUMN "status" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "vehicles" ALTER COLUMN "status" TYPE "vehicles_status_enum_old" USING "status"::"text"::"vehicles_status_enum_old"`);
        await queryRunner.query(`ALTER TABLE "vehicles" ALTER COLUMN "status" SET DEFAULT '2'`);
        await queryRunner.query(`DROP TYPE "vehicles_status_enum"`);
        await queryRunner.query(`ALTER TYPE "vehicles_status_enum_old" RENAME TO  "vehicles_status_enum"`);
        await queryRunner.query(`ALTER TABLE "groups" DROP CONSTRAINT "UQ_664ea405ae2a10c264d582ee563"`);
        await queryRunner.query(`COMMENT ON COLUMN "groups"."name" IS NULL`);
    }

}
