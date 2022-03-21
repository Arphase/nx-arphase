import {MigrationInterface, QueryRunner} from "typeorm";

export class VehiclesModuleChanges1610929454026 implements MigrationInterface {
    name = 'VehiclesModuleChanges1610929454026'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "guarantees" DROP CONSTRAINT "FK_ddc9998e3c112e3f0b258910697"`);
        await queryRunner.query(`ALTER TABLE "vehicles" ADD "companyId" integer`);
        await queryRunner.query(`ALTER TABLE "vehicles" ADD "userId" integer`);
        await queryRunner.query(`ALTER TABLE "vehicles" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "vehicles" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "clients" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "clients" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "guarantees" ADD "productType" character varying`);
        await queryRunner.query(`ALTER TABLE "guarantees" ADD "kilometrageStart" integer`);
        await queryRunner.query(`ALTER TABLE "guarantees" ADD "kilometrageEnd" integer`);
        await queryRunner.query(`COMMENT ON COLUMN "guarantees"."vehicleId" IS NULL`);
        await queryRunner.query(`ALTER TABLE "guarantees" DROP CONSTRAINT "REL_ddc9998e3c112e3f0b25891069"`);
        await queryRunner.query(`ALTER TABLE "vehicles" ADD CONSTRAINT "FK_f5243d588524b2a705fcdf9b4d5" FOREIGN KEY ("companyId") REFERENCES "companies"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "vehicles" ADD CONSTRAINT "FK_20f139b9d79f917ef735efacb00" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "guarantees" ADD CONSTRAINT "FK_ddc9998e3c112e3f0b258910697" FOREIGN KEY ("vehicleId") REFERENCES "vehicles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "guarantees" DROP CONSTRAINT "FK_ddc9998e3c112e3f0b258910697"`);
        await queryRunner.query(`ALTER TABLE "vehicles" DROP CONSTRAINT "FK_20f139b9d79f917ef735efacb00"`);
        await queryRunner.query(`ALTER TABLE "vehicles" DROP CONSTRAINT "FK_f5243d588524b2a705fcdf9b4d5"`);
        await queryRunner.query(`ALTER TABLE "guarantees" ADD CONSTRAINT "REL_ddc9998e3c112e3f0b25891069" UNIQUE ("vehicleId")`);
        await queryRunner.query(`COMMENT ON COLUMN "guarantees"."vehicleId" IS NULL`);
        await queryRunner.query(`ALTER TABLE "guarantees" DROP COLUMN "kilometrageEnd"`);
        await queryRunner.query(`ALTER TABLE "guarantees" DROP COLUMN "kilometrageStart"`);
        await queryRunner.query(`ALTER TABLE "guarantees" DROP COLUMN "productType"`);
        await queryRunner.query(`ALTER TABLE "clients" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "clients" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "vehicles" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "vehicles" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "vehicles" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "vehicles" DROP COLUMN "companyId"`);
        await queryRunner.query(`ALTER TABLE "guarantees" ADD CONSTRAINT "FK_ddc9998e3c112e3f0b258910697" FOREIGN KEY ("vehicleId") REFERENCES "vehicles"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

}
