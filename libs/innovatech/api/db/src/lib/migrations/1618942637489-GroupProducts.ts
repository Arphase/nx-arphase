import { MigrationInterface, QueryRunner } from 'typeorm';

export class GroupProducts1618942637489 implements MigrationInterface {
  name = 'GroupProducts1618942637489';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "groups_products_products" ("groupsId" integer NOT NULL, "productsId" integer NOT NULL, CONSTRAINT "PK_7c384308d9f8c66801e1b77f675" PRIMARY KEY ("groupsId", "productsId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_06dc2480e5dc96e8122a97f3c0" ON "groups_products_products" ("groupsId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_aa22bdecdf0b66ce3e051ffed6" ON "groups_products_products" ("productsId") `,
    );
    await queryRunner.query(`ALTER TABLE "products" ADD "minYear" integer NOT NULL`);
    await queryRunner.query(`ALTER TABLE "products" ADD "maxYear" integer NOT NULL`);
    await queryRunner.query(`ALTER TABLE "products" ADD "minHp" integer NOT NULL`);
    await queryRunner.query(`ALTER TABLE "products" ADD "maxHp" integer NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "groups_products_products" ADD CONSTRAINT "FK_06dc2480e5dc96e8122a97f3c04" FOREIGN KEY ("groupsId") REFERENCES "groups"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "groups_products_products" ADD CONSTRAINT "FK_aa22bdecdf0b66ce3e051ffed63" FOREIGN KEY ("productsId") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "groups_products_products" DROP CONSTRAINT "FK_aa22bdecdf0b66ce3e051ffed63"`);
    await queryRunner.query(`ALTER TABLE "groups_products_products" DROP CONSTRAINT "FK_06dc2480e5dc96e8122a97f3c04"`);
    await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "maxHp"`);
    await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "minHp"`);
    await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "maxYear"`);
    await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "minYear"`);
    await queryRunner.query(`DROP INDEX "IDX_aa22bdecdf0b66ce3e051ffed6"`);
    await queryRunner.query(`DROP INDEX "IDX_06dc2480e5dc96e8122a97f3c0"`);
    await queryRunner.query(`DROP TABLE "groups_products_products"`);
  }
}
