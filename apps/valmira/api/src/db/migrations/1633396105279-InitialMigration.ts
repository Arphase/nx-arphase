import {MigrationInterface, QueryRunner} from "typeorm";

export class InitialMigration1633396105279 implements MigrationInterface {
    name = 'InitialMigration1633396105279'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "customers" ("id" SERIAL NOT NULL, "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "email" character varying NOT NULL, "phone" character varying NOT NULL, CONSTRAINT "UQ_8536b8b85c06969f84f0c098b03" UNIQUE ("email"), CONSTRAINT "PK_133ec679a801fab5e070f73d3ea" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "photos" ("id" SERIAL NOT NULL, "path" character varying NOT NULL, "key" character varying NOT NULL, "placeId" integer, CONSTRAINT "PK_5220c45b8e32d49d767b9b3d725" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."places_category_enum" AS ENUM('1', '2', '3')`);
        await queryRunner.query(`CREATE TABLE "places" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "description" character varying NOT NULL, "capacity" integer NOT NULL, "area" integer NOT NULL, "services" text array, "weeklyPrice" integer NOT NULL, "weekendPrice" integer NOT NULL, "rooms" integer NOT NULL, "beds" integer NOT NULL, "active" boolean NOT NULL DEFAULT false, "category" "public"."places_category_enum" NOT NULL, CONSTRAINT "PK_1afab86e226b4c3bc9a74465c12" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "promocodes" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "startDate" TIMESTAMP NOT NULL, "endDate" TIMESTAMP NOT NULL, "amount" integer NOT NULL, "active" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_cfd49e54a2ddfbc02636f8f2904" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."reservations_status_enum" AS ENUM('1', '2', '3')`);
        await queryRunner.query(`CREATE TABLE "reservations" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "startDate" TIMESTAMP NOT NULL, "endDate" TIMESTAMP NOT NULL, "status" "public"."reservations_status_enum" NOT NULL DEFAULT '1', "paymentId" character varying, "total" integer NOT NULL, "placeId" integer NOT NULL, "additionalComments" character varying, "promocodeId" integer, "customerId" integer, CONSTRAINT "UQ_f8dbec76216ec5e4ef78cdecbcf" UNIQUE ("paymentId"), CONSTRAINT "PK_da95cef71b617ac35dc5bcda243" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "reservationAdditionalProducts" ("id" SERIAL NOT NULL, "amount" integer NOT NULL, "price" integer NOT NULL, "additionalProductId" integer NOT NULL, "reservationId" integer NOT NULL, CONSTRAINT "PK_bcc199e1d36389f706bc23c05f6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "additionalProducts" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "description" character varying NOT NULL, "price" integer NOT NULL, "active" boolean NOT NULL DEFAULT false, CONSTRAINT "UQ_ef132a3313bbd95b7f925630a10" UNIQUE ("name"), CONSTRAINT "PK_4e5e266ce4ba626f2b7b376c3d4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."users_role_enum" AS ENUM('1', '2')`);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "email" character varying NOT NULL, "role" "public"."users_role_enum" NOT NULL DEFAULT '1', "password" character varying NOT NULL, "salt" character varying NOT NULL, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "resetPassword" ("id" SERIAL NOT NULL, "userId" integer NOT NULL, "passwordToken" character varying NOT NULL, "timestamp" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_98b22462b330d1a21bcbbb1c6eb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "photos" ADD CONSTRAINT "FK_7cb0ab6df49ccf020a2eeed6139" FOREIGN KEY ("placeId") REFERENCES "places"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "reservations" ADD CONSTRAINT "FK_d2eb08b14b861e2d416031af6a7" FOREIGN KEY ("placeId") REFERENCES "places"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "reservations" ADD CONSTRAINT "FK_e26405a880bc1d952bccfef22bd" FOREIGN KEY ("promocodeId") REFERENCES "promocodes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "reservations" ADD CONSTRAINT "FK_487ec4ed757eed0d34c7ddee79b" FOREIGN KEY ("customerId") REFERENCES "customers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "reservationAdditionalProducts" ADD CONSTRAINT "FK_078543804220675280487379ab0" FOREIGN KEY ("additionalProductId") REFERENCES "additionalProducts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "reservationAdditionalProducts" ADD CONSTRAINT "FK_6676f8b41db022c4de4c759fd0e" FOREIGN KEY ("reservationId") REFERENCES "reservations"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "resetPassword" ADD CONSTRAINT "FK_aa4d2bbc4c2750ffeb377d4207c" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "resetPassword" DROP CONSTRAINT "FK_aa4d2bbc4c2750ffeb377d4207c"`);
        await queryRunner.query(`ALTER TABLE "reservationAdditionalProducts" DROP CONSTRAINT "FK_6676f8b41db022c4de4c759fd0e"`);
        await queryRunner.query(`ALTER TABLE "reservationAdditionalProducts" DROP CONSTRAINT "FK_078543804220675280487379ab0"`);
        await queryRunner.query(`ALTER TABLE "reservations" DROP CONSTRAINT "FK_487ec4ed757eed0d34c7ddee79b"`);
        await queryRunner.query(`ALTER TABLE "reservations" DROP CONSTRAINT "FK_e26405a880bc1d952bccfef22bd"`);
        await queryRunner.query(`ALTER TABLE "reservations" DROP CONSTRAINT "FK_d2eb08b14b861e2d416031af6a7"`);
        await queryRunner.query(`ALTER TABLE "photos" DROP CONSTRAINT "FK_7cb0ab6df49ccf020a2eeed6139"`);
        await queryRunner.query(`DROP TABLE "resetPassword"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TYPE "public"."users_role_enum"`);
        await queryRunner.query(`DROP TABLE "additionalProducts"`);
        await queryRunner.query(`DROP TABLE "reservationAdditionalProducts"`);
        await queryRunner.query(`DROP TABLE "reservations"`);
        await queryRunner.query(`DROP TYPE "public"."reservations_status_enum"`);
        await queryRunner.query(`DROP TABLE "promocodes"`);
        await queryRunner.query(`DROP TABLE "places"`);
        await queryRunner.query(`DROP TYPE "public"."places_category_enum"`);
        await queryRunner.query(`DROP TABLE "photos"`);
        await queryRunner.query(`DROP TABLE "customers"`);
    }

}
