import {MigrationInterface, QueryRunner} from "typeorm";

export class AddGuarantee1596826092014 implements MigrationInterface {
    name = 'AddGuarantee1596826092014'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "addresses" ("id" SERIAL NOT NULL, "zipCode" integer NOT NULL, "country" character varying NOT NULL, "state" character varying NOT NULL, "city" character varying NOT NULL, "suburb" character varying NOT NULL, "street" character varying NOT NULL, "externalNumber" character varying NOT NULL, "internalNumber" character varying NOT NULL, CONSTRAINT "PK_745d8f43d3af10ab8247465e450" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "vehicles" ("id" SERIAL NOT NULL, "productType" character varying NOT NULL, "brand" character varying NOT NULL, "model" character varying NOT NULL, "version" character varying NOT NULL, "year" integer NOT NULL, "invoiceDate" character varying NOT NULL, "vin" character varying NOT NULL, "motorNumber" character varying NOT NULL, "serialNumber" character varying NOT NULL, "horsePower" integer NOT NULL, "kilometrageStart" integer NOT NULL, "kilometrageEnd" integer NOT NULL, "guaranteeId" integer, CONSTRAINT "REL_4141bcec54aeebf062c538c70f" UNIQUE ("guaranteeId"), CONSTRAINT "PK_18d8646b59304dce4af3a9e35b6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "guarantees" ("id" SERIAL NOT NULL, "createdAt" date NOT NULL, "status" "guarantees_status_enum" NOT NULL, "paymentOrder" character varying NOT NULL, "startDate" date NOT NULL, "endDate" date NOT NULL, "amount" integer NOT NULL, CONSTRAINT "PK_0952d3cdbdaa3d2a5d2089ceed3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "moralPersons" ("id" SERIAL NOT NULL, "clientId" integer NOT NULL, "businessName" character varying NOT NULL, "constitutionDate" TIMESTAMP NOT NULL, "distributor" character varying NOT NULL, "adviser" character varying NOT NULL, CONSTRAINT "REL_e2237cc00059f04255e8da1b93" UNIQUE ("clientId"), CONSTRAINT "PK_29820f8583a7c89163c2bf90b68" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "physicalPersons" ("id" SERIAL NOT NULL, "clientId" integer NOT NULL, "name" character varying NOT NULL, "lastName" character varying NOT NULL, "secondLastName" character varying NOT NULL, "birthDate" TIMESTAMP NOT NULL, CONSTRAINT "REL_0427601bccfa9b30b9236fea5b" UNIQUE ("clientId"), CONSTRAINT "PK_79e51e348c67a8146d89bae0974" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "clients" ("id" SERIAL NOT NULL, "personType" "clients_persontype_enum" NOT NULL, "rfc" character varying NOT NULL, "phone" character varying NOT NULL, "email" character varying NOT NULL, "addressId" integer NOT NULL, "salesPlace" character varying NOT NULL, "guaranteeId" integer, CONSTRAINT "REL_b884b1acf3629ef0d52a3f66a8" UNIQUE ("guaranteeId"), CONSTRAINT "REL_67c4d10f39fdc8a0bbfccdcf73" UNIQUE ("addressId"), CONSTRAINT "PK_f1ab7cf3a5714dbc6bb4e1c28a4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "localities" ("id" SERIAL NOT NULL, "version" integer NOT NULL, "zipCode" character varying NOT NULL, "suburb" character varying NOT NULL, "city" character varying NOT NULL, "state" character varying NOT NULL, CONSTRAINT "PK_7fa2291f3588423d800e02a8479" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "firstName" character varying NOT NULL, "secondName" character varying, "lastName" character varying NOT NULL, "secondLastName" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "salt" character varying NOT NULL, "role" "users_role_enum" NOT NULL, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "vehicles" ADD CONSTRAINT "FK_4141bcec54aeebf062c538c70f1" FOREIGN KEY ("guaranteeId") REFERENCES "guarantees"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "moralPersons" ADD CONSTRAINT "FK_e2237cc00059f04255e8da1b930" FOREIGN KEY ("clientId") REFERENCES "clients"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "physicalPersons" ADD CONSTRAINT "FK_0427601bccfa9b30b9236fea5b0" FOREIGN KEY ("clientId") REFERENCES "clients"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "clients" ADD CONSTRAINT "FK_b884b1acf3629ef0d52a3f66a83" FOREIGN KEY ("guaranteeId") REFERENCES "guarantees"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "clients" ADD CONSTRAINT "FK_67c4d10f39fdc8a0bbfccdcf73a" FOREIGN KEY ("addressId") REFERENCES "addresses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "clients" DROP CONSTRAINT "FK_67c4d10f39fdc8a0bbfccdcf73a"`);
        await queryRunner.query(`ALTER TABLE "clients" DROP CONSTRAINT "FK_b884b1acf3629ef0d52a3f66a83"`);
        await queryRunner.query(`ALTER TABLE "physicalPersons" DROP CONSTRAINT "FK_0427601bccfa9b30b9236fea5b0"`);
        await queryRunner.query(`ALTER TABLE "moralPersons" DROP CONSTRAINT "FK_e2237cc00059f04255e8da1b930"`);
        await queryRunner.query(`ALTER TABLE "vehicles" DROP CONSTRAINT "FK_4141bcec54aeebf062c538c70f1"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "localities"`);
        await queryRunner.query(`DROP TABLE "clients"`);
        await queryRunner.query(`DROP TABLE "physicalPersons"`);
        await queryRunner.query(`DROP TABLE "moralPersons"`);
        await queryRunner.query(`DROP TABLE "guarantees"`);
        await queryRunner.query(`DROP TABLE "vehicles"`);
        await queryRunner.query(`DROP TABLE "addresses"`);
    }

}
