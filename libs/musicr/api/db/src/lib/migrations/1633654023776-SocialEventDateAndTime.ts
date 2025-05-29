import { MigrationInterface, QueryRunner } from 'typeorm';

export class SocialEventDateAndTime1633654023776 implements MigrationInterface {
  name = 'SocialEventDateAndTime1633654023776';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "socialEvents" DROP COLUMN "endDate"`);
    await queryRunner.query(`ALTER TABLE "socialEvents" DROP COLUMN "startDate"`);
    await queryRunner.query(`ALTER TABLE "socialEvents" ADD "date" TIMESTAMP NOT NULL`);
    await queryRunner.query(`ALTER TABLE "socialEvents" ADD "startTime" TIMESTAMP NOT NULL`);
    await queryRunner.query(`ALTER TABLE "socialEvents" ADD "endTime" TIMESTAMP NOT NULL`);
    await queryRunner.query(`ALTER TABLE "socialEvents" DROP COLUMN "eventPlace"`);
    await queryRunner.query(
      `CREATE TYPE "public"."socialEvents_eventplace_enum" AS ENUM('1', '2', '3', '4', '5', '6', '7')`,
    );
    await queryRunner.query(
      `ALTER TABLE "socialEvents" ADD "eventPlace" "public"."socialEvents_eventplace_enum" NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "socialEvents" ALTER COLUMN "notes" DROP NOT NULL`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "socialEvents" ALTER COLUMN "notes" SET NOT NULL`);
    await queryRunner.query(`ALTER TABLE "socialEvents" DROP COLUMN "eventPlace"`);
    await queryRunner.query(`DROP TYPE "public"."socialEvents_eventplace_enum"`);
    await queryRunner.query(`ALTER TABLE "socialEvents" ADD "eventPlace" character varying NOT NULL`);
    await queryRunner.query(`ALTER TABLE "socialEvents" DROP COLUMN "endTime"`);
    await queryRunner.query(`ALTER TABLE "socialEvents" DROP COLUMN "startTime"`);
    await queryRunner.query(`ALTER TABLE "socialEvents" DROP COLUMN "date"`);
    await queryRunner.query(`ALTER TABLE "socialEvents" ADD "startDate" TIMESTAMP NOT NULL`);
    await queryRunner.query(`ALTER TABLE "socialEvents" ADD "endDate" TIMESTAMP NOT NULL`);
  }
}
