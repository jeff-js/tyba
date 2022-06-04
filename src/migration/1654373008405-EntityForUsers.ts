import { MigrationInterface, QueryRunner } from 'typeorm';

export class EntityForUsers1654373008405 implements MigrationInterface {
  name = 'EntityForUsers1654373008405';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "user" ("id" SERIAL NOT NULL, "email" text NOT NULL, "firstName" text NOT NULL, "lastName" text NOT NULL, "password" text NOT NULL, CONSTRAINT "UQ_user_email" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "user"`);
  }
}
