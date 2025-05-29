import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialMigration1633454112296 implements MigrationInterface {
  name = 'InitialMigration1633454112296';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "customers" ("id" SERIAL NOT NULL, "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "email" character varying NOT NULL, "phone" character varying NOT NULL, CONSTRAINT "UQ_8536b8b85c06969f84f0c098b03" UNIQUE ("email"), CONSTRAINT "PK_133ec679a801fab5e070f73d3ea" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "addresses" ("id" SERIAL NOT NULL, "zipcode" character varying NOT NULL, "country" character varying NOT NULL, "state" character varying NOT NULL, "city" character varying NOT NULL, "suburb" character varying NOT NULL, "street" character varying NOT NULL, "externalNumber" character varying NOT NULL, "internalNumber" character varying, CONSTRAINT "PK_745d8f43d3af10ab8247465e450" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "socialEvents" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "eventType" character varying NOT NULL, "startDate" TIMESTAMP NOT NULL, "endDate" TIMESTAMP NOT NULL, "eventPlace" character varying NOT NULL, "notes" character varying NOT NULL, "requiresAssembly" boolean NOT NULL, "addressId" integer, CONSTRAINT "REL_fecf572d6a8af9324d6aec8569" UNIQUE ("addressId"), CONSTRAINT "PK_05719dde0d7acaaa7beeb3982ee" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "orders" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "total" integer NOT NULL, "customerId" integer, "socialEventId" integer, CONSTRAINT "REL_e5de51ca888d8b1f5ac25799dd" UNIQUE ("customerId"), CONSTRAINT "REL_8071ced285a199108da61d3c48" UNIQUE ("socialEventId"), CONSTRAINT "PK_710e2d4957aa5878dfe94e4ac2f" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "categories" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, CONSTRAINT "UQ_8b0be371d28245da6e4f4b61878" UNIQUE ("name"), CONSTRAINT "PK_24dbc6126a28ff948da33e97d3b" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "subcategories" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, "categoryId" integer NOT NULL, CONSTRAINT "PK_793ef34ad0a3f86f09d4837007c" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_45aa12007713728e241d091775" ON "subcategories" ("name", "categoryId") `,
    );
    await queryRunner.query(
      `CREATE TABLE "products" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "price" integer NOT NULL, "disclaimer" character varying, "description" character varying, "productComponents" text array, "subcategoryId" integer, CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_55b5ea36a0ed3bd94e0d723da1" ON "products" ("name", "subcategoryId") `,
    );
    await queryRunner.query(
      `CREATE TABLE "photos" ("id" SERIAL NOT NULL, "url" character varying NOT NULL, "key" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "order" integer, "productId" integer, "priceOptionId" integer, CONSTRAINT "PK_5220c45b8e32d49d767b9b3d725" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "priceOptions" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "price" integer NOT NULL, "productId" integer NOT NULL, CONSTRAINT "PK_d9edb05fcbc56f5658e28ae4cf5" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "orderProducts" ("id" SERIAL NOT NULL, "orderId" integer NOT NULL, "productId" integer NOT NULL, "priceOptionId" integer, "amount" integer NOT NULL, "price" integer NOT NULL, CONSTRAINT "PK_cb16d1f7ac5d8fcd6d66edf3254" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "orderProductAdditionalOptions" ("id" SERIAL NOT NULL, "orderProductId" integer NOT NULL, "additionalOptionId" integer NOT NULL, "price" integer NOT NULL, CONSTRAINT "PK_70c1eb5bfb95b4a3e684da7ffbe" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "additionalOptions" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "price" integer NOT NULL, "productId" integer NOT NULL, CONSTRAINT "PK_f8b5f784cebec05ed2f4df037c4" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "users" ("id" SERIAL NOT NULL, "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "salt" character varying NOT NULL, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "resetPassword" ("id" SERIAL NOT NULL, "userId" integer NOT NULL, "passwordToken" character varying NOT NULL, "timestamp" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_98b22462b330d1a21bcbbb1c6eb" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "socialEvents" ADD CONSTRAINT "FK_fecf572d6a8af9324d6aec85690" FOREIGN KEY ("addressId") REFERENCES "addresses"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "orders" ADD CONSTRAINT "FK_e5de51ca888d8b1f5ac25799dd1" FOREIGN KEY ("customerId") REFERENCES "customers"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "orders" ADD CONSTRAINT "FK_8071ced285a199108da61d3c482" FOREIGN KEY ("socialEventId") REFERENCES "socialEvents"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "subcategories" ADD CONSTRAINT "FK_d1fe096726c3c5b8a500950e448" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "products" ADD CONSTRAINT "FK_7527f75cb36bea4b7f2b86f7d1d" FOREIGN KEY ("subcategoryId") REFERENCES "subcategories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "photos" ADD CONSTRAINT "FK_4e7f1b413734d5424ba9902a185" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "photos" ADD CONSTRAINT "FK_8316642224e6158c17db5b43c70" FOREIGN KEY ("priceOptionId") REFERENCES "priceOptions"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "priceOptions" ADD CONSTRAINT "FK_59ca00fd6813fca44c42b74156f" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "orderProducts" ADD CONSTRAINT "FK_93e963c47272eb995d0b9ac533f" FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "orderProducts" ADD CONSTRAINT "FK_7d42ce111ef9b507cc28b098fce" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "orderProducts" ADD CONSTRAINT "FK_1d9ba6a92eb5d7bf85a03045afe" FOREIGN KEY ("priceOptionId") REFERENCES "priceOptions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "orderProductAdditionalOptions" ADD CONSTRAINT "FK_c913ec8140a34dd504ae7e12fcb" FOREIGN KEY ("orderProductId") REFERENCES "orderProducts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "orderProductAdditionalOptions" ADD CONSTRAINT "FK_32a420aef5eb38334b010496f59" FOREIGN KEY ("additionalOptionId") REFERENCES "additionalOptions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "additionalOptions" ADD CONSTRAINT "FK_e2aa103d03b0f6a41ff35afda76" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "resetPassword" ADD CONSTRAINT "FK_aa4d2bbc4c2750ffeb377d4207c" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "resetPassword" DROP CONSTRAINT "FK_aa4d2bbc4c2750ffeb377d4207c"`);
    await queryRunner.query(`ALTER TABLE "additionalOptions" DROP CONSTRAINT "FK_e2aa103d03b0f6a41ff35afda76"`);
    await queryRunner.query(
      `ALTER TABLE "orderProductAdditionalOptions" DROP CONSTRAINT "FK_32a420aef5eb38334b010496f59"`,
    );
    await queryRunner.query(
      `ALTER TABLE "orderProductAdditionalOptions" DROP CONSTRAINT "FK_c913ec8140a34dd504ae7e12fcb"`,
    );
    await queryRunner.query(`ALTER TABLE "orderProducts" DROP CONSTRAINT "FK_1d9ba6a92eb5d7bf85a03045afe"`);
    await queryRunner.query(`ALTER TABLE "orderProducts" DROP CONSTRAINT "FK_7d42ce111ef9b507cc28b098fce"`);
    await queryRunner.query(`ALTER TABLE "orderProducts" DROP CONSTRAINT "FK_93e963c47272eb995d0b9ac533f"`);
    await queryRunner.query(`ALTER TABLE "priceOptions" DROP CONSTRAINT "FK_59ca00fd6813fca44c42b74156f"`);
    await queryRunner.query(`ALTER TABLE "photos" DROP CONSTRAINT "FK_8316642224e6158c17db5b43c70"`);
    await queryRunner.query(`ALTER TABLE "photos" DROP CONSTRAINT "FK_4e7f1b413734d5424ba9902a185"`);
    await queryRunner.query(`ALTER TABLE "products" DROP CONSTRAINT "FK_7527f75cb36bea4b7f2b86f7d1d"`);
    await queryRunner.query(`ALTER TABLE "subcategories" DROP CONSTRAINT "FK_d1fe096726c3c5b8a500950e448"`);
    await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_8071ced285a199108da61d3c482"`);
    await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_e5de51ca888d8b1f5ac25799dd1"`);
    await queryRunner.query(`ALTER TABLE "socialEvents" DROP CONSTRAINT "FK_fecf572d6a8af9324d6aec85690"`);
    await queryRunner.query(`DROP TABLE "resetPassword"`);
    await queryRunner.query(`DROP TABLE "users"`);
    await queryRunner.query(`DROP TABLE "additionalOptions"`);
    await queryRunner.query(`DROP TABLE "orderProductAdditionalOptions"`);
    await queryRunner.query(`DROP TABLE "orderProducts"`);
    await queryRunner.query(`DROP TABLE "priceOptions"`);
    await queryRunner.query(`DROP TABLE "photos"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_55b5ea36a0ed3bd94e0d723da1"`);
    await queryRunner.query(`DROP TABLE "products"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_45aa12007713728e241d091775"`);
    await queryRunner.query(`DROP TABLE "subcategories"`);
    await queryRunner.query(`DROP TABLE "categories"`);
    await queryRunner.query(`DROP TABLE "orders"`);
    await queryRunner.query(`DROP TABLE "socialEvents"`);
    await queryRunner.query(`DROP TABLE "addresses"`);
    await queryRunner.query(`DROP TABLE "customers"`);
  }
}
