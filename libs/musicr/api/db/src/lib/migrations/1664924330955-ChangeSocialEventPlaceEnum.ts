import {MigrationInterface, QueryRunner} from "typeorm";

export class ChangeSocialEventPlaceEnum1664924330955 implements MigrationInterface {
    name = 'ChangeSocialEventPlaceEnum1664924330955'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TYPE "public"."socialEvents_eventplace_enum" RENAME TO "socialEvents_eventplace_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."socialEvents_eventplace_enum" AS ENUM('1', '2', '3', '4', '5', '6', '7', 'backyard', 'garage', 'garden', 'terrace', 'office', 'inside', 'eventHall')`);
        await queryRunner.query(`ALTER TABLE "socialEvents" ALTER COLUMN "eventPlace" TYPE "public"."socialEvents_eventplace_enum" USING "eventPlace"::"text"::"public"."socialEvents_eventplace_enum"`);
        await queryRunner.query(`DROP TYPE "public"."socialEvents_eventplace_enum_old"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."socialEvents_eventplace_enum_old" AS ENUM('1', '2', '3', '4', '5', '6', '7')`);
        await queryRunner.query(`ALTER TABLE "socialEvents" ALTER COLUMN "eventPlace" TYPE "public"."socialEvents_eventplace_enum_old" USING "eventPlace"::"text"::"public"."socialEvents_eventplace_enum_old"`);
        await queryRunner.query(`DROP TYPE "public"."socialEvents_eventplace_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."socialEvents_eventplace_enum_old" RENAME TO "socialEvents_eventplace_enum"`);
    }

}
