import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTableAddress1672602828475 implements MigrationInterface {
    name = 'CreateTableAddress1672602828475'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "doctors" RENAME COLUMN "cep" TO "addressId"`);
        await queryRunner.query(`CREATE TABLE "addresses" ("id" SERIAL NOT NULL, "cep" character varying NOT NULL, "street" character varying NOT NULL, "district" character varying NOT NULL, "city" character varying NOT NULL, "state" character varying NOT NULL, CONSTRAINT "UQ_41aa769237c813f7ffebd0b26c4" UNIQUE ("cep"), CONSTRAINT "PK_745d8f43d3af10ab8247465e450" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "doctors" DROP COLUMN "addressId"`);
        await queryRunner.query(`ALTER TABLE "doctors" ADD "addressId" integer`);
        await queryRunner.query(`ALTER TABLE "doctors" ADD CONSTRAINT "FK_ad816aa66aa42fad408b1b7d762" FOREIGN KEY ("addressId") REFERENCES "addresses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "doctors" DROP CONSTRAINT "FK_ad816aa66aa42fad408b1b7d762"`);
        await queryRunner.query(`ALTER TABLE "doctors" DROP COLUMN "addressId"`);
        await queryRunner.query(`ALTER TABLE "doctors" ADD "addressId" character varying NOT NULL`);
        await queryRunner.query(`DROP TABLE "addresses"`);
        await queryRunner.query(`ALTER TABLE "doctors" RENAME COLUMN "addressId" TO "cep"`);
    }

}
