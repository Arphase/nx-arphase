import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddPhotoToCategory1670607864405 implements MigrationInterface {
  name = 'AddPhotoToCategory1670607864405';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "categories" ADD "photoId" integer`);
    await queryRunner.query(
      `ALTER TABLE "categories" ADD CONSTRAINT "UQ_70b3606445c9ebc4b1ee1c9056f" UNIQUE ("photoId")`,
    );
    await queryRunner.query(
      `ALTER TABLE "categories" ADD CONSTRAINT "FK_70b3606445c9ebc4b1ee1c9056f" FOREIGN KEY ("photoId") REFERENCES "photos"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "categories" DROP CONSTRAINT "FK_70b3606445c9ebc4b1ee1c9056f"`);
    await queryRunner.query(`ALTER TABLE "categories" DROP CONSTRAINT "UQ_70b3606445c9ebc4b1ee1c9056f"`);
    await queryRunner.query(`ALTER TABLE "categories" DROP COLUMN "photoId"`);
  }
}
