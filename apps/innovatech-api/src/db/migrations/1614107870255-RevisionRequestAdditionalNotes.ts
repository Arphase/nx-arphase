import {MigrationInterface, QueryRunner} from "typeorm";

export class RevisionRequestAdditionalNotes1614107870255 implements MigrationInterface {
    name = 'RevisionRequestAdditionalNotes1614107870255'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "revisionRequests" ADD "additionalNotes" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "revisionRequests" DROP COLUMN "additionalNotes"`);
    }

}
