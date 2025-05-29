import { MigrationInterface, QueryRunner } from "typeorm";

export class AddProductPromotions1748450173609 implements MigrationInterface {
    name = 'AddProductPromotions1748450173609'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" ADD "hasActivePromotion" boolean`);
        await queryRunner.query(`ALTER TABLE "products" ADD "promotionDiscount" integer`);
        await queryRunner.query(`ALTER TABLE "priceOptions" ADD "includedInPromotion" boolean`);
        await queryRunner.query(`ALTER TABLE "additionalOptions" ADD "includedInPromotion" boolean`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "additionalOptions" DROP COLUMN "includedInPromotion"`);
        await queryRunner.query(`ALTER TABLE "priceOptions" DROP COLUMN "includedInPromotion"`);
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "promotionDiscount"`);
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "hasActivePromotion"`);
    }

}
