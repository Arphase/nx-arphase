import {MigrationInterface, QueryRunner} from "typeorm";

export class RemoveSerialNumber1600101047110 implements MigrationInterface {
    name = 'RemoveSerialNumber1600101047110'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "vehicles" DROP COLUMN "serialNumber"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "vehicles" ADD "serialNumber" character varying NOT NULL`);
    }

}
