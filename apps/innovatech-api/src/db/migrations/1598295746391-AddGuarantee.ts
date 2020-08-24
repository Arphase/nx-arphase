import {MigrationInterface, QueryRunner} from "typeorm";

export class AddGuarantee1598295746391 implements MigrationInterface {
    name = 'AddGuarantee1598295746391'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "addresses" ("id" SERIAL NOT NULL, "zipCode" integer NOT NULL, "country" character varying NOT NULL, "state" character varying NOT NULL, "city" character varying NOT NULL, "suburb" character varying NOT NULL, "street" character varying NOT NULL, "externalNumber" character varying NOT NULL, "internalNumber" character varying, CONSTRAINT "PK_745d8f43d3af10ab8247465e450" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "moralPersons" ("id" SERIAL NOT NULL, "businessName" character varying NOT NULL, "constitutionDate" TIMESTAMP NOT NULL, "distributor" character varying NOT NULL, "adviser" character varying NOT NULL, CONSTRAINT "PK_29820f8583a7c89163c2bf90b68" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "physicalPersons" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "lastName" character varying NOT NULL, "secondLastName" character varying NOT NULL, "birthDate" TIMESTAMP NOT NULL, CONSTRAINT "PK_79e51e348c67a8146d89bae0974" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "clients_persontype_enum" AS ENUM('1', '2')`);
        await queryRunner.query(`CREATE TABLE "clients" ("id" SERIAL NOT NULL, "personType" "clients_persontype_enum" NOT NULL, "rfc" character varying NOT NULL, "phone" character varying NOT NULL, "email" character varying NOT NULL, "salesPlace" character varying NOT NULL, "physicalPersonId" integer, "moralPersonId" integer, "addressId" integer, CONSTRAINT "REL_004b12b344a2b5e45d512f078f" UNIQUE ("physicalPersonId"), CONSTRAINT "REL_e64d4ca3278c87ae67b64eed0e" UNIQUE ("moralPersonId"), CONSTRAINT "REL_67c4d10f39fdc8a0bbfccdcf73" UNIQUE ("addressId"), CONSTRAINT "PK_f1ab7cf3a5714dbc6bb4e1c28a4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "vehicles" ("id" SERIAL NOT NULL, "productType" character varying NOT NULL, "brand" character varying NOT NULL, "model" character varying NOT NULL, "version" character varying NOT NULL, "year" integer NOT NULL, "invoiceDate" character varying NOT NULL, "vin" character varying NOT NULL, "motorNumber" character varying NOT NULL, "serialNumber" character varying NOT NULL, "horsePower" integer NOT NULL, "kilometrageStart" integer NOT NULL, "kilometrageEnd" integer NOT NULL, CONSTRAINT "PK_18d8646b59304dce4af3a9e35b6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "guarantees_status_enum" AS ENUM('1', '2', '3', '4')`);
        await queryRunner.query(`CREATE TABLE "guarantees" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "status" "guarantees_status_enum" NOT NULL, "startDate" TIMESTAMP NOT NULL, "endDate" TIMESTAMP NOT NULL, "amount" integer NOT NULL, "clientId" integer, "vehicleId" integer, CONSTRAINT "REL_c02a0e1902c818d3819c438528" UNIQUE ("clientId"), CONSTRAINT "REL_ddc9998e3c112e3f0b25891069" UNIQUE ("vehicleId"), CONSTRAINT "PK_0952d3cdbdaa3d2a5d2089ceed3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "localities" ("id" SERIAL NOT NULL, "version" integer NOT NULL, "zipCode" character varying NOT NULL, "suburb" character varying NOT NULL, "city" character varying NOT NULL, "state" character varying NOT NULL, CONSTRAINT "PK_7fa2291f3588423d800e02a8479" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "users_role_enum" AS ENUM('superAdmin', 'agencyUser')`);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "firstName" character varying NOT NULL, "secondName" character varying, "lastName" character varying NOT NULL, "secondLastName" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "salt" character varying NOT NULL, "role" "users_role_enum" NOT NULL, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "clients" ADD CONSTRAINT "FK_004b12b344a2b5e45d512f078fb" FOREIGN KEY ("physicalPersonId") REFERENCES "physicalPersons"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "clients" ADD CONSTRAINT "FK_e64d4ca3278c87ae67b64eed0ec" FOREIGN KEY ("moralPersonId") REFERENCES "moralPersons"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "clients" ADD CONSTRAINT "FK_67c4d10f39fdc8a0bbfccdcf73a" FOREIGN KEY ("addressId") REFERENCES "addresses"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "guarantees" ADD CONSTRAINT "FK_c02a0e1902c818d3819c4385282" FOREIGN KEY ("clientId") REFERENCES "clients"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "guarantees" ADD CONSTRAINT "FK_ddc9998e3c112e3f0b258910697" FOREIGN KEY ("vehicleId") REFERENCES "vehicles"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "guarantees" DROP CONSTRAINT "FK_ddc9998e3c112e3f0b258910697"`);
        await queryRunner.query(`ALTER TABLE "guarantees" DROP CONSTRAINT "FK_c02a0e1902c818d3819c4385282"`);
        await queryRunner.query(`ALTER TABLE "clients" DROP CONSTRAINT "FK_67c4d10f39fdc8a0bbfccdcf73a"`);
        await queryRunner.query(`ALTER TABLE "clients" DROP CONSTRAINT "FK_e64d4ca3278c87ae67b64eed0ec"`);
        await queryRunner.query(`ALTER TABLE "clients" DROP CONSTRAINT "FK_004b12b344a2b5e45d512f078fb"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TYPE "users_role_enum"`);
        await queryRunner.query(`DROP TABLE "localities"`);
        await queryRunner.query(`DROP TABLE "guarantees"`);
        await queryRunner.query(`DROP TYPE "guarantees_status_enum"`);
        await queryRunner.query(`DROP TABLE "vehicles"`);
        await queryRunner.query(`DROP TABLE "clients"`);
        await queryRunner.query(`DROP TYPE "clients_persontype_enum"`);
        await queryRunner.query(`DROP TABLE "physicalPersons"`);
        await queryRunner.query(`DROP TABLE "moralPersons"`);
        await queryRunner.query(`DROP TABLE "addresses"`);
    }

}
