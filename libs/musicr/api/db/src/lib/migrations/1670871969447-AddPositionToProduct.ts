import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddPositionToProduct1670871969447 implements MigrationInterface {
  name = 'AddPositionToProduct1670871969447';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX "public"."IDX_55b5ea36a0ed3bd94e0d723da1"`);
    await queryRunner.query(`ALTER TABLE "products" ADD "position" integer`);
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_610626a8a244da3101f32830c5" ON "products" ("name", "subcategoryId", "position") `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX "public"."IDX_610626a8a244da3101f32830c5"`);
    await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "position"`);
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_55b5ea36a0ed3bd94e0d723da1" ON "products" ("name", "subcategoryId") `,
    );
  }
}
