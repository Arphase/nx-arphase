import { MigrationInterface, QueryRunner } from 'typeorm';

export class CustomersWithMultipleOrders1634004751217 implements MigrationInterface {
  name = 'CustomersWithMultipleOrders1634004751217';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_e5de51ca888d8b1f5ac25799dd1"`);
    await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "REL_e5de51ca888d8b1f5ac25799dd"`);
    await queryRunner.query(
      `ALTER TABLE "orders" ADD CONSTRAINT "FK_e5de51ca888d8b1f5ac25799dd1" FOREIGN KEY ("customerId") REFERENCES "customers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_e5de51ca888d8b1f5ac25799dd1"`);
    await queryRunner.query(
      `ALTER TABLE "orders" ADD CONSTRAINT "REL_e5de51ca888d8b1f5ac25799dd" UNIQUE ("customerId")`,
    );
    await queryRunner.query(
      `ALTER TABLE "orders" ADD CONSTRAINT "FK_e5de51ca888d8b1f5ac25799dd1" FOREIGN KEY ("customerId") REFERENCES "customers"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }
}
