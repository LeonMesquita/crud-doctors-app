import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterTableAddress1672606934552 implements MigrationInterface {
    name = 'AlterTableAddress1672606934552'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "addresses" ADD "complement" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "addresses" DROP COLUMN "complement"`);
    }

}
