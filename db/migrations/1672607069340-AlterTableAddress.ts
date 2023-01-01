import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterTableAddress1672607069340 implements MigrationInterface {
    name = 'AlterTableAddress1672607069340'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "addresses" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "addresses" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "addresses" ADD "deletedAt" TIMESTAMP`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "addresses" DROP COLUMN "deletedAt"`);
        await queryRunner.query(`ALTER TABLE "addresses" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "addresses" DROP COLUMN "createdAt"`);
    }

}
