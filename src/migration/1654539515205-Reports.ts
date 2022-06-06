import { MigrationInterface, QueryRunner } from 'typeorm';

export class Reports1654539515205 implements MigrationInterface {
  name = 'Reports1654539515205';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "report_user" ("id" SERIAL NOT NULL, "result" jsonb NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "userId" integer, CONSTRAINT "PK_c6686efa4cd49fa9a429f01bac8" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "report_user" ADD CONSTRAINT "FK_d9cadec1d41af3d2fce21bb7f84" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "report_user" DROP CONSTRAINT "FK_d9cadec1d41af3d2fce21bb7f84"`,
    );
    await queryRunner.query(`DROP TABLE "report_user"`);
  }
}
