import {MigrationInterface, QueryRunner} from "typeorm";

export class ResetPasswordWithUserId1606868262811 implements MigrationInterface {
    name = 'ResetPasswordWithUserId1606868262811'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "resetPassword" RENAME COLUMN "email" TO "userId"`);
        await queryRunner.query(`ALTER TABLE "companies" DROP CONSTRAINT "FK_a5b17ec6d6623270a25bedf624f"`);
        await queryRunner.query(`ALTER TABLE "companies" ALTER COLUMN "groupId" SET NOT NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "companies"."groupId" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "users"."role" IS NULL`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "role" SET DEFAULT '3'`);
        await queryRunner.query(`ALTER TABLE "resetPassword" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "resetPassword" ADD "userId" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "companies" ADD CONSTRAINT "FK_a5b17ec6d6623270a25bedf624f" FOREIGN KEY ("groupId") REFERENCES "groups"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "resetPassword" ADD CONSTRAINT "FK_aa4d2bbc4c2750ffeb377d4207c" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "resetPassword" DROP CONSTRAINT "FK_aa4d2bbc4c2750ffeb377d4207c"`);
        await queryRunner.query(`ALTER TABLE "companies" DROP CONSTRAINT "FK_a5b17ec6d6623270a25bedf624f"`);
        await queryRunner.query(`ALTER TABLE "resetPassword" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "resetPassword" ADD "userId" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "role" DROP DEFAULT`);
        await queryRunner.query(`COMMENT ON COLUMN "users"."role" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "companies"."groupId" IS NULL`);
        await queryRunner.query(`ALTER TABLE "companies" ALTER COLUMN "groupId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "companies" ADD CONSTRAINT "FK_a5b17ec6d6623270a25bedf624f" FOREIGN KEY ("groupId") REFERENCES "groups"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "resetPassword" RENAME COLUMN "userId" TO "email"`);
    }

}
