import {MigrationInterface, QueryRunner} from "typeorm";

export class SoftDeleteEntities1645929605968 implements MigrationInterface {
    name = 'SoftDeleteEntities1645929605968'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "photos" DROP COLUMN "deletedAt"`);
        await queryRunner.query(`ALTER TABLE "customers" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "customers" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "customers" ADD "deletedAt" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "addresses" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "addresses" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "addresses" ADD "deletedAt" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "socialEvents" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "socialEvents" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "socialEvents" ADD "deletedAt" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "orders" ADD "deletedAt" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "categories" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "categories" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "categories" ADD "deletedAt" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "subcategories" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "subcategories" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "subcategories" ADD "deletedAt" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "products" ADD "deletedAt" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "priceOptions" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "priceOptions" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "priceOptions" ADD "deletedAt" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "orderProducts" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "orderProducts" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "orderProducts" ADD "deletedAt" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "orderProductAdditionalOptions" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "orderProductAdditionalOptions" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "orderProductAdditionalOptions" ADD "deletedAt" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "additionalOptions" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "additionalOptions" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "additionalOptions" ADD "deletedAt" TIMESTAMP`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "additionalOptions" DROP COLUMN "deletedAt"`);
        await queryRunner.query(`ALTER TABLE "additionalOptions" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "additionalOptions" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "orderProductAdditionalOptions" DROP COLUMN "deletedAt"`);
        await queryRunner.query(`ALTER TABLE "orderProductAdditionalOptions" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "orderProductAdditionalOptions" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "orderProducts" DROP COLUMN "deletedAt"`);
        await queryRunner.query(`ALTER TABLE "orderProducts" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "orderProducts" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "priceOptions" DROP COLUMN "deletedAt"`);
        await queryRunner.query(`ALTER TABLE "priceOptions" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "priceOptions" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "deletedAt"`);
        await queryRunner.query(`ALTER TABLE "subcategories" DROP COLUMN "deletedAt"`);
        await queryRunner.query(`ALTER TABLE "subcategories" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "subcategories" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "categories" DROP COLUMN "deletedAt"`);
        await queryRunner.query(`ALTER TABLE "categories" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "categories" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "deletedAt"`);
        await queryRunner.query(`ALTER TABLE "socialEvents" DROP COLUMN "deletedAt"`);
        await queryRunner.query(`ALTER TABLE "socialEvents" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "socialEvents" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "addresses" DROP COLUMN "deletedAt"`);
        await queryRunner.query(`ALTER TABLE "addresses" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "addresses" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "customers" DROP COLUMN "deletedAt"`);
        await queryRunner.query(`ALTER TABLE "customers" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "customers" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "photos" ADD "deletedAt" TIMESTAMP`);
    }

}
