import {MigrationInterface, QueryRunner} from "typeorm";

export class AddRevisionsModels1611356649326 implements MigrationInterface {
    name = 'AddRevisionsModels1611356649326'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "revisions_status_enum" AS ENUM('1', '2', '3')`);
        await queryRunner.query(`CREATE TABLE "revisions" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "observations" character varying NOT NULL, "status" "revisions_status_enum" NOT NULL, "vehicleId" integer NOT NULL, CONSTRAINT "PK_4aa9ee2c71c50508c3c501573c9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`COMMENT ON COLUMN "vehicles"."vin" IS NULL`);
        await queryRunner.query(`ALTER TABLE "vehicles" ADD CONSTRAINT "UQ_8288ce015b69c5856cf54e07a67" UNIQUE ("vin")`);
        await queryRunner.query(`ALTER TABLE "revisions" ADD CONSTRAINT "FK_4b822f5ec8e8f3342337518df23" FOREIGN KEY ("vehicleId") REFERENCES "vehicles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "revisions" DROP CONSTRAINT "FK_4b822f5ec8e8f3342337518df23"`);
        await queryRunner.query(`ALTER TABLE "vehicles" DROP CONSTRAINT "UQ_8288ce015b69c5856cf54e07a67"`);
        await queryRunner.query(`COMMENT ON COLUMN "vehicles"."vin" IS NULL`);
        await queryRunner.query(`DROP TABLE "revisions"`);
        await queryRunner.query(`DROP TYPE "revisions_status_enum"`);
    }

}
