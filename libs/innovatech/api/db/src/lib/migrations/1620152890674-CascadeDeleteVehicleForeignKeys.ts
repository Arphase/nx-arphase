import { MigrationInterface, QueryRunner } from 'typeorm';

export class CascadeDeleteVehicleForeignKeys1620152890674 implements MigrationInterface {
  name = 'CascadeDeleteVehicleForeignKeys1620152890674';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "revisionRequests" DROP CONSTRAINT "FK_edca98d20aaea702aec48832957"`);
    await queryRunner.query(`ALTER TABLE "revisions" DROP CONSTRAINT "FK_4b822f5ec8e8f3342337518df23"`);
    await queryRunner.query(
      `ALTER TABLE "revisionRequests" ADD CONSTRAINT "FK_edca98d20aaea702aec48832957" FOREIGN KEY ("vehicleId") REFERENCES "vehicles"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "revisions" ADD CONSTRAINT "FK_4b822f5ec8e8f3342337518df23" FOREIGN KEY ("vehicleId") REFERENCES "vehicles"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "revisions" DROP CONSTRAINT "FK_4b822f5ec8e8f3342337518df23"`);
    await queryRunner.query(`ALTER TABLE "revisionRequests" DROP CONSTRAINT "FK_edca98d20aaea702aec48832957"`);
    await queryRunner.query(
      `ALTER TABLE "revisions" ADD CONSTRAINT "FK_4b822f5ec8e8f3342337518df23" FOREIGN KEY ("vehicleId") REFERENCES "vehicles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "revisionRequests" ADD CONSTRAINT "FK_edca98d20aaea702aec48832957" FOREIGN KEY ("vehicleId") REFERENCES "vehicles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
