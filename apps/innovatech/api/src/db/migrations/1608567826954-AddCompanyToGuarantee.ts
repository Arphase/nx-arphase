import {MigrationInterface, QueryRunner} from "typeorm";

export class AddCompanyToGuarantee1608567826954 implements MigrationInterface {
    name = 'AddCompanyToGuarantee1608567826954'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "addresses" RENAME COLUMN "zipCode" TO "zipcode"`);
        await queryRunner.query(`ALTER TABLE "moralPersons" DROP COLUMN "distributor"`);
        await queryRunner.query(`ALTER TABLE "localities" DROP COLUMN "version"`);
        await queryRunner.query(`ALTER TABLE "localities" DROP COLUMN "zipCode"`);
        await queryRunner.query(`ALTER TABLE "guarantees" ADD "invoiceNumber" character varying`);
        await queryRunner.query(`ALTER TABLE "guarantees" ADD "companyId" integer`);
        await queryRunner.query(`ALTER TABLE "localities" ADD "zipcode" character varying`);
        await queryRunner.query(`COMMENT ON COLUMN "guarantees"."status" IS NULL`);
        await queryRunner.query(`ALTER TABLE "guarantees" ALTER COLUMN "status" SET DEFAULT '1'`);
        await queryRunner.query(`ALTER TABLE "guarantees" ADD CONSTRAINT "FK_60d713c61ad833f7e56a7be40e8" FOREIGN KEY ("companyId") REFERENCES "companies"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "guarantees" DROP CONSTRAINT "FK_60d713c61ad833f7e56a7be40e8"`);
        await queryRunner.query(`ALTER TABLE "guarantees" ALTER COLUMN "status" DROP DEFAULT`);
        await queryRunner.query(`COMMENT ON COLUMN "guarantees"."status" IS NULL`);
        await queryRunner.query(`ALTER TABLE "localities" DROP COLUMN "zipcode"`);
        await queryRunner.query(`ALTER TABLE "guarantees" DROP COLUMN "companyId"`);
        await queryRunner.query(`ALTER TABLE "guarantees" DROP COLUMN "invoiceNumber"`);
        await queryRunner.query(`ALTER TABLE "localities" ADD "zipCode" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "localities" ADD "version" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "moralPersons" ADD "distributor" character varying`);
        await queryRunner.query(`ALTER TABLE "addresses" RENAME COLUMN "zipcode" TO "zipCode"`);
    }

}
