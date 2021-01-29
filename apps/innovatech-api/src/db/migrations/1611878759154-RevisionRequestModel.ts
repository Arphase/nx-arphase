import {MigrationInterface, QueryRunner} from "typeorm";

export class RevisionRequestModel1611878759154 implements MigrationInterface {
    name = 'RevisionRequestModel1611878759154'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "revisionRequests_status_enum" AS ENUM('1', '2', '3')`);
        await queryRunner.query(`CREATE TABLE "revisionRequests" ("id" SERIAL NOT NULL, "addressId" integer NOT NULL, "name" character varying NOT NULL, "phone" character varying NOT NULL, "email" character varying NOT NULL, "status" "revisionRequests_status_enum" NOT NULL DEFAULT '1', "companyId" integer, "userId" integer, "vehicleId" integer NOT NULL, CONSTRAINT "REL_2bdb06f8ed3aeb6383b327c695" UNIQUE ("addressId"), CONSTRAINT "PK_4a84f1a3c9b7ddbbf5cf4a1b4ea" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "vehicles_status_enum" AS ENUM('1', '2')`);
        await queryRunner.query(`ALTER TABLE "vehicles" ADD "status" "vehicles_status_enum" NOT NULL DEFAULT '2'`);
        await queryRunner.query(`ALTER TABLE "vehicles" DROP CONSTRAINT "UQ_8288ce015b69c5856cf54e07a67"`);
        await queryRunner.query(`ALTER TABLE "vehicles" DROP COLUMN "vin"`);
        await queryRunner.query(`ALTER TABLE "vehicles" ADD "vin" character varying(17)`);
        await queryRunner.query(`ALTER TABLE "vehicles" ADD CONSTRAINT "UQ_8288ce015b69c5856cf54e07a67" UNIQUE ("vin")`);
        await queryRunner.query(`ALTER TABLE "guarantees" DROP CONSTRAINT "FK_ddc9998e3c112e3f0b258910697"`);
        await queryRunner.query(`ALTER TABLE "guarantees" ALTER COLUMN "vehicleId" SET NOT NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "guarantees"."vehicleId" IS NULL`);
        await queryRunner.query(`ALTER TABLE "revisionRequests" ADD CONSTRAINT "FK_2bdb06f8ed3aeb6383b327c6957" FOREIGN KEY ("addressId") REFERENCES "addresses"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "revisionRequests" ADD CONSTRAINT "FK_da9b669c0c674df2292c39a9696" FOREIGN KEY ("companyId") REFERENCES "companies"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "revisionRequests" ADD CONSTRAINT "FK_1fff66f1be1e1323467cbc36469" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "revisionRequests" ADD CONSTRAINT "FK_edca98d20aaea702aec48832957" FOREIGN KEY ("vehicleId") REFERENCES "vehicles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "guarantees" ADD CONSTRAINT "FK_ddc9998e3c112e3f0b258910697" FOREIGN KEY ("vehicleId") REFERENCES "vehicles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "guarantees" DROP CONSTRAINT "FK_ddc9998e3c112e3f0b258910697"`);
        await queryRunner.query(`ALTER TABLE "revisionRequests" DROP CONSTRAINT "FK_edca98d20aaea702aec48832957"`);
        await queryRunner.query(`ALTER TABLE "revisionRequests" DROP CONSTRAINT "FK_1fff66f1be1e1323467cbc36469"`);
        await queryRunner.query(`ALTER TABLE "revisionRequests" DROP CONSTRAINT "FK_da9b669c0c674df2292c39a9696"`);
        await queryRunner.query(`ALTER TABLE "revisionRequests" DROP CONSTRAINT "FK_2bdb06f8ed3aeb6383b327c6957"`);
        await queryRunner.query(`COMMENT ON COLUMN "guarantees"."vehicleId" IS NULL`);
        await queryRunner.query(`ALTER TABLE "guarantees" ALTER COLUMN "vehicleId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "guarantees" ADD CONSTRAINT "FK_ddc9998e3c112e3f0b258910697" FOREIGN KEY ("vehicleId") REFERENCES "vehicles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "vehicles" DROP CONSTRAINT "UQ_8288ce015b69c5856cf54e07a67"`);
        await queryRunner.query(`ALTER TABLE "vehicles" DROP COLUMN "vin"`);
        await queryRunner.query(`ALTER TABLE "vehicles" ADD "vin" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "vehicles" ADD CONSTRAINT "UQ_8288ce015b69c5856cf54e07a67" UNIQUE ("vin")`);
        await queryRunner.query(`ALTER TABLE "vehicles" DROP COLUMN "status"`);
        await queryRunner.query(`DROP TYPE "vehicles_status_enum"`);
        await queryRunner.query(`DROP TABLE "revisionRequests"`);
        await queryRunner.query(`DROP TYPE "revisionRequests_status_enum"`);
    }

}
