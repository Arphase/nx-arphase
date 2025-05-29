import { MigrationInterface, QueryRunner } from 'typeorm';

export class RemovePlaceCategory1634690929975 implements MigrationInterface {
  name = 'RemovePlaceCategory1634690929975';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "places" DROP COLUMN "category"`);
    await queryRunner.query(`DROP TYPE "public"."places_category_enum"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TYPE "public"."places_category_enum" AS ENUM('1', '2', '3')`);
    await queryRunner.query(`ALTER TABLE "places" ADD "category" "public"."places_category_enum" NOT NULL`);
  }
}
