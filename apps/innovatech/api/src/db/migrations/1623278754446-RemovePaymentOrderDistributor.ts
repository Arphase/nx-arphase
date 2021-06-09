import {MigrationInterface, QueryRunner} from "typeorm";

export class RemovePaymentOrderDistributor1623278754446 implements MigrationInterface {
    name = 'RemovePaymentOrderDistributor1623278754446'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "groups_products_products" DROP CONSTRAINT "FK_06dc2480e5dc96e8122a97f3c04"`);
        await queryRunner.query(`ALTER TABLE "groups_products_products" DROP CONSTRAINT "FK_aa22bdecdf0b66ce3e051ffed63"`);
        await queryRunner.query(`ALTER TABLE "paymentOrders" DROP COLUMN "distributor"`);
        await queryRunner.query(`ALTER TABLE "vehicles" DROP COLUMN "productType"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "UQ_3dd688f49161bf5d3819b2831bd"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "rfc"`);
        await queryRunner.query(`ALTER TABLE "guarantees" DROP COLUMN "productType"`);
        await queryRunner.query(`ALTER TABLE "groups_products_products" ADD CONSTRAINT "FK_06dc2480e5dc96e8122a97f3c04" FOREIGN KEY ("groupsId") REFERENCES "groups"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "groups_products_products" ADD CONSTRAINT "FK_aa22bdecdf0b66ce3e051ffed63" FOREIGN KEY ("productsId") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "groups_products_products" DROP CONSTRAINT "FK_aa22bdecdf0b66ce3e051ffed63"`);
        await queryRunner.query(`ALTER TABLE "groups_products_products" DROP CONSTRAINT "FK_06dc2480e5dc96e8122a97f3c04"`);
        await queryRunner.query(`ALTER TABLE "guarantees" ADD "productType" character varying`);
        await queryRunner.query(`ALTER TABLE "users" ADD "rfc" character varying`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "UQ_3dd688f49161bf5d3819b2831bd" UNIQUE ("rfc")`);
        await queryRunner.query(`ALTER TABLE "vehicles" ADD "productType" character varying`);
        await queryRunner.query(`ALTER TABLE "paymentOrders" ADD "distributor" character varying`);
        await queryRunner.query(`ALTER TABLE "groups_products_products" ADD CONSTRAINT "FK_aa22bdecdf0b66ce3e051ffed63" FOREIGN KEY ("productsId") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "groups_products_products" ADD CONSTRAINT "FK_06dc2480e5dc96e8122a97f3c04" FOREIGN KEY ("groupsId") REFERENCES "groups"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
