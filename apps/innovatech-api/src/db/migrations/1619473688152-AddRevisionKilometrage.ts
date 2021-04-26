import {MigrationInterface, QueryRunner} from "typeorm";

export class AddRevisionKilometrage1619473688152 implements MigrationInterface {
    name = 'AddRevisionKilometrage1619473688152'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "revisions" ADD "kilometrage" integer`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "revisions" DROP COLUMN "kilometrage"`);
    }

}
