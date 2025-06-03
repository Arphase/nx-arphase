import { MigrationInterface, QueryRunner } from "typeorm";

export class AddProductEventType1748931144174 implements MigrationInterface {
    name = 'AddProductEventType1748931144174'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."products_eventtypes_enum" AS ENUM('Anniversary', 'Bachelor party', 'Baptism / First Communion', 'Cocktail party', 'Corporate event', 'Dinner', 'Graduation', 'Pool party / Ranch-style gathering', 'Posada', 'Ring ceremony', 'Small party', 'Wedding', 'XVBirthday')`);
        await queryRunner.query(`ALTER TABLE "products" ADD "eventTypes" "public"."products_eventtypes_enum" array DEFAULT '{}'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "eventTypes"`);
        await queryRunner.query(`DROP TYPE "public"."products_eventtypes_enum"`);
    }

}
