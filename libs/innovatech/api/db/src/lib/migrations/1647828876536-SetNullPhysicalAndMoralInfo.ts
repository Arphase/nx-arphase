import {MigrationInterface, QueryRunner} from "typeorm";

export class SetNullPhysicalAndMoralInfo1647828876536 implements MigrationInterface {
    name = 'SetNullPhysicalAndMoralInfo1647828876536'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "clients" DROP CONSTRAINT "FK_e64d4ca3278c87ae67b64eed0ec"`);
        await queryRunner.query(`ALTER TABLE "clients" DROP CONSTRAINT "FK_004b12b344a2b5e45d512f078fb"`);
        await queryRunner.query(`ALTER TABLE "clients" ADD CONSTRAINT "FK_004b12b344a2b5e45d512f078fb" FOREIGN KEY ("physicalPersonId") REFERENCES "physicalPersons"("id") ON DELETE SET NULL ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "clients" ADD CONSTRAINT "FK_e64d4ca3278c87ae67b64eed0ec" FOREIGN KEY ("moralPersonId") REFERENCES "moralPersons"("id") ON DELETE SET NULL ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "clients" DROP CONSTRAINT "FK_e64d4ca3278c87ae67b64eed0ec"`);
        await queryRunner.query(`ALTER TABLE "clients" DROP CONSTRAINT "FK_004b12b344a2b5e45d512f078fb"`);
        await queryRunner.query(`ALTER TABLE "clients" ADD CONSTRAINT "FK_004b12b344a2b5e45d512f078fb" FOREIGN KEY ("physicalPersonId") REFERENCES "physicalPersons"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "clients" ADD CONSTRAINT "FK_e64d4ca3278c87ae67b64eed0ec" FOREIGN KEY ("moralPersonId") REFERENCES "moralPersons"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

}
