import {MigrationInterface, QueryRunner} from "typeorm";

export class RemoveExtraSocialEventPlaceTypes1664924502905 implements MigrationInterface {
    name = 'RemoveExtraSocialEventPlaceTypes1664924502905'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TYPE "public"."socialEvents_eventplace_enum" RENAME TO "socialEvents_eventplace_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."socialEvents_eventplace_enum" AS ENUM('backyard', 'garage', 'garden', 'terrace', 'office', 'inside', 'eventHall')`);
        await queryRunner.query(`ALTER TABLE "socialEvents" ALTER COLUMN "eventPlace" TYPE "public"."socialEvents_eventplace_enum" USING "eventPlace"::"text"::"public"."socialEvents_eventplace_enum"`);
        await queryRunner.query(`DROP TYPE "public"."socialEvents_eventplace_enum_old"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."socialEvents_eventplace_enum_old" AS ENUM('1', '2', '3', '4', '5', '6', '7', 'backyard', 'garage', 'garden', 'terrace', 'office', 'inside', 'eventHall')`);
        await queryRunner.query(`ALTER TABLE "socialEvents" ALTER COLUMN "eventPlace" TYPE "public"."socialEvents_eventplace_enum_old" USING "eventPlace"::"text"::"public"."socialEvents_eventplace_enum_old"`);
        await queryRunner.query(`DROP TYPE "public"."socialEvents_eventplace_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."socialEvents_eventplace_enum_old" RENAME TO "socialEvents_eventplace_enum"`);
    }

}
