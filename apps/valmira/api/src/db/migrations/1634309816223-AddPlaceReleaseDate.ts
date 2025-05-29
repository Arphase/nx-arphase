import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddPlaceReleaseDate1634309816223 implements MigrationInterface {
  name = 'AddPlaceReleaseDate1634309816223';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "places" ADD "releaseDate" TIMESTAMP`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "places" DROP COLUMN "releaseDate"`);
  }
}
