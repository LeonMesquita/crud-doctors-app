import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterTableDoctors1672611092447 implements MigrationInterface {
    name = 'AlterTableDoctors1672611092447'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "doctors" ADD CONSTRAINT "UQ_4437fc38d690917ca3279c7d421" UNIQUE ("name")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "doctors" DROP CONSTRAINT "UQ_4437fc38d690917ca3279c7d421"`);
    }

}
