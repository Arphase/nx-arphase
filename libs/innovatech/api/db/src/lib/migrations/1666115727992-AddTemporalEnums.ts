import { MigrationInterface, QueryRunner } from "typeorm";

export class AddTemporalEnums1666115727992 implements MigrationInterface {
    name = 'AddTemporalEnums1666115727992'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TYPE "public"."clients_persontype_enum" RENAME TO "clients_persontype_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."clients_persontype_enum" AS ENUM('physical', 'moral', '1', '2')`);
        await queryRunner.query(`ALTER TABLE "clients" ALTER COLUMN "personType" TYPE "public"."clients_persontype_enum" USING "personType"::"text"::"public"."clients_persontype_enum"`);
        await queryRunner.query(`DROP TYPE "public"."clients_persontype_enum_old"`);
        await queryRunner.query(`ALTER TYPE "public"."revisions_status_enum" RENAME TO "revisions_status_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."revisions_status_enum" AS ENUM('elegible', 'needsRepairs', 'notElegible', '1', '2', '3')`);
        await queryRunner.query(`ALTER TABLE "revisions" ALTER COLUMN "status" TYPE "public"."revisions_status_enum" USING "status"::"text"::"public"."revisions_status_enum"`);
        await queryRunner.query(`DROP TYPE "public"."revisions_status_enum_old"`);
        await queryRunner.query(`ALTER TYPE "public"."vehicles_status_enum" RENAME TO "vehicles_status_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."vehicles_status_enum" AS ENUM('elegible', 'needsRevision', 'hasActiveGuarantee', 'notElegible', 'soldWidhoutGuarantee', '1', '2', '3', '4', '5')`);
        await queryRunner.query(`ALTER TABLE "vehicles" ALTER COLUMN "status" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "vehicles" ALTER COLUMN "status" TYPE "public"."vehicles_status_enum" USING "status"::"text"::"public"."vehicles_status_enum"`);
        await queryRunner.query(`ALTER TABLE "vehicles" ALTER COLUMN "status" SET DEFAULT 'needsRevision'`);
        await queryRunner.query(`DROP TYPE "public"."vehicles_status_enum_old"`);
        await queryRunner.query(`ALTER TYPE "public"."revisionRequests_status_enum" RENAME TO "revisionRequests_status_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."revisionRequests_status_enum" AS ENUM('new', 'inProgress', 'completed', '1', '2', '3')`);
        await queryRunner.query(`ALTER TABLE "revisionRequests" ALTER COLUMN "status" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "revisionRequests" ALTER COLUMN "status" TYPE "public"."revisionRequests_status_enum" USING "status"::"text"::"public"."revisionRequests_status_enum"`);
        await queryRunner.query(`ALTER TABLE "revisionRequests" ALTER COLUMN "status" SET DEFAULT 'new'`);
        await queryRunner.query(`DROP TYPE "public"."revisionRequests_status_enum_old"`);
        await queryRunner.query(`ALTER TYPE "public"."users_role_enum" RENAME TO "users_role_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."users_role_enum" AS ENUM('superAdmin', 'admin', 'agencyUser', 'repairman', '1', '2', '3', '4')`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "role" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "role" TYPE "public"."users_role_enum" USING "role"::"text"::"public"."users_role_enum"`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "role" SET DEFAULT 'agencyUser'`);
        await queryRunner.query(`DROP TYPE "public"."users_role_enum_old"`);
        await queryRunner.query(`ALTER TYPE "public"."guarantees_status_enum" RENAME TO "guarantees_status_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."guarantees_status_enum" AS ENUM('outstanding', 'paid', 'cancelled', 'expired', '1', '2', '3', '4')`);
        await queryRunner.query(`ALTER TABLE "guarantees" ALTER COLUMN "status" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "guarantees" ALTER COLUMN "status" TYPE "public"."guarantees_status_enum" USING "status"::"text"::"public"."guarantees_status_enum"`);
        await queryRunner.query(`ALTER TABLE "guarantees" ALTER COLUMN "status" SET DEFAULT 'outstanding'`);
        await queryRunner.query(`DROP TYPE "public"."guarantees_status_enum_old"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."guarantees_status_enum_old" AS ENUM('1', '2', '3', '4')`);
        await queryRunner.query(`ALTER TABLE "guarantees" ALTER COLUMN "status" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "guarantees" ALTER COLUMN "status" TYPE "public"."guarantees_status_enum_old" USING "status"::"text"::"public"."guarantees_status_enum_old"`);
        await queryRunner.query(`ALTER TABLE "guarantees" ALTER COLUMN "status" SET DEFAULT '1'`);
        await queryRunner.query(`DROP TYPE "public"."guarantees_status_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."guarantees_status_enum_old" RENAME TO "guarantees_status_enum"`);
        await queryRunner.query(`CREATE TYPE "public"."users_role_enum_old" AS ENUM('1', '2', '3', '4')`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "role" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "role" TYPE "public"."users_role_enum_old" USING "role"::"text"::"public"."users_role_enum_old"`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "role" SET DEFAULT '3'`);
        await queryRunner.query(`DROP TYPE "public"."users_role_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."users_role_enum_old" RENAME TO "users_role_enum"`);
        await queryRunner.query(`CREATE TYPE "public"."revisionRequests_status_enum_old" AS ENUM('1', '2', '3')`);
        await queryRunner.query(`ALTER TABLE "revisionRequests" ALTER COLUMN "status" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "revisionRequests" ALTER COLUMN "status" TYPE "public"."revisionRequests_status_enum_old" USING "status"::"text"::"public"."revisionRequests_status_enum_old"`);
        await queryRunner.query(`ALTER TABLE "revisionRequests" ALTER COLUMN "status" SET DEFAULT '1'`);
        await queryRunner.query(`DROP TYPE "public"."revisionRequests_status_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."revisionRequests_status_enum_old" RENAME TO "revisionRequests_status_enum"`);
        await queryRunner.query(`CREATE TYPE "public"."vehicles_status_enum_old" AS ENUM('1', '2', '3', '4', '5')`);
        await queryRunner.query(`ALTER TABLE "vehicles" ALTER COLUMN "status" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "vehicles" ALTER COLUMN "status" TYPE "public"."vehicles_status_enum_old" USING "status"::"text"::"public"."vehicles_status_enum_old"`);
        await queryRunner.query(`ALTER TABLE "vehicles" ALTER COLUMN "status" SET DEFAULT '2'`);
        await queryRunner.query(`DROP TYPE "public"."vehicles_status_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."vehicles_status_enum_old" RENAME TO "vehicles_status_enum"`);
        await queryRunner.query(`CREATE TYPE "public"."revisions_status_enum_old" AS ENUM('1', '2', '3')`);
        await queryRunner.query(`ALTER TABLE "revisions" ALTER COLUMN "status" TYPE "public"."revisions_status_enum_old" USING "status"::"text"::"public"."revisions_status_enum_old"`);
        await queryRunner.query(`DROP TYPE "public"."revisions_status_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."revisions_status_enum_old" RENAME TO "revisions_status_enum"`);
        await queryRunner.query(`CREATE TYPE "public"."clients_persontype_enum_old" AS ENUM('1', '2')`);
        await queryRunner.query(`ALTER TABLE "clients" ALTER COLUMN "personType" TYPE "public"."clients_persontype_enum_old" USING "personType"::"text"::"public"."clients_persontype_enum_old"`);
        await queryRunner.query(`DROP TYPE "public"."clients_persontype_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."clients_persontype_enum_old" RENAME TO "clients_persontype_enum"`);
    }

}
