import {MigrationInterface, QueryRunner} from "typeorm";

export class AddLocalities1596751688095 implements MigrationInterface {
    name = 'AddLocalities1596751688095'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "addresses" RENAME COLUMN "zipCode" TO "zipcode"`);
        await queryRunner.query(`CREATE TABLE "localities" ("id" SERIAL NOT NULL, "version" integer NOT NULL, "zipcode" character varying NOT NULL, "suburb" character varying NOT NULL, "city" character varying NOT NULL, "state" character varying NOT NULL, CONSTRAINT "PK_7fa2291f3588423d800e02a8479" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "localities"`);
        await queryRunner.query(`ALTER TABLE "addresses" RENAME COLUMN "zipcode" TO "zipCode"`);
    }

}
