import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddPositionToSubcategory1670868216068 implements MigrationInterface {
  name = 'AddPositionToSubcategory1670868216068';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX "public"."IDX_45aa12007713728e241d091775"`);
    await queryRunner.query(`ALTER TABLE "subcategories" ADD "position" integer`);
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_894afebedcfd7d36bd110cb768" ON "subcategories" ("name", "categoryId", "position") `
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX "public"."IDX_894afebedcfd7d36bd110cb768"`);
    await queryRunner.query(`ALTER TABLE "subcategories" DROP COLUMN "position"`);
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_45aa12007713728e241d091775" ON "subcategories" ("name", "categoryId") `
    );
  }
}
