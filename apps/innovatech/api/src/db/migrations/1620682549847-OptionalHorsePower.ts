import {MigrationInterface, QueryRunner} from "typeorm";

export class OptionalHorsePower1620682549847 implements MigrationInterface {
    name = 'OptionalHorsePower1620682549847'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "vehicles" ALTER COLUMN "horsePower" DROP NOT NULL`);
        await queryRunner.query(`ALTER TYPE "users_role_enum" RENAME TO "users_role_enum_old"`);
        await queryRunner.query(`CREATE TYPE "users_role_enum" AS ENUM('1', '2', '3', '4')`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "role" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "role" TYPE "users_role_enum" USING "role"::"text"::"users_role_enum"`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "role" SET DEFAULT '3'`);
        await queryRunner.query(`DROP TYPE "users_role_enum_old"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "users_role_enum_old" AS ENUM('1', '2', '3')`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "role" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "role" TYPE "users_role_enum_old" USING "role"::"text"::"users_role_enum_old"`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "role" SET DEFAULT '3'`);
        await queryRunner.query(`DROP TYPE "users_role_enum"`);
        await queryRunner.query(`ALTER TYPE "users_role_enum_old" RENAME TO "users_role_enum"`);
        await queryRunner.query(`ALTER TABLE "vehicles" ALTER COLUMN "horsePower" SET NOT NULL`);
    }

}
