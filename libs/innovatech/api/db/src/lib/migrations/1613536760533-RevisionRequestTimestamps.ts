import { MigrationInterface, QueryRunner } from 'typeorm';

export class RevisionRequestTimestamps1613536760533 implements MigrationInterface {
  name = 'RevisionRequestTimestamps1613536760533';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "revisionRequests" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
    await queryRunner.query(`ALTER TABLE "revisionRequests" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "revisionRequests" DROP COLUMN "updatedAt"`);
    await queryRunner.query(`ALTER TABLE "revisionRequests" DROP COLUMN "createdAt"`);
  }
}
