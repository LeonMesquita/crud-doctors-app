import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterPhoneNumbers1672687725764 implements MigrationInterface {
    name = 'AlterPhoneNumbers1672687725764'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "doctors" DROP CONSTRAINT "UQ_47af744becc4ed27ac4796b344a"`);
        await queryRunner.query(`ALTER TABLE "doctors" DROP COLUMN "landline_number"`);
        await queryRunner.query(`ALTER TABLE "doctors" ADD "landline_number" character varying(8) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "doctors" ADD CONSTRAINT "UQ_47af744becc4ed27ac4796b344a" UNIQUE ("landline_number")`);
        await queryRunner.query(`ALTER TABLE "doctors" DROP CONSTRAINT "UQ_8ea1247f4242cb8a6d9db820ba5"`);
        await queryRunner.query(`ALTER TABLE "doctors" DROP COLUMN "mobile_number"`);
        await queryRunner.query(`ALTER TABLE "doctors" ADD "mobile_number" character varying(11) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "doctors" ADD CONSTRAINT "UQ_8ea1247f4242cb8a6d9db820ba5" UNIQUE ("mobile_number")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "doctors" DROP CONSTRAINT "UQ_8ea1247f4242cb8a6d9db820ba5"`);
        await queryRunner.query(`ALTER TABLE "doctors" DROP COLUMN "mobile_number"`);
        await queryRunner.query(`ALTER TABLE "doctors" ADD "mobile_number" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "doctors" ADD CONSTRAINT "UQ_8ea1247f4242cb8a6d9db820ba5" UNIQUE ("mobile_number")`);
        await queryRunner.query(`ALTER TABLE "doctors" DROP CONSTRAINT "UQ_47af744becc4ed27ac4796b344a"`);
        await queryRunner.query(`ALTER TABLE "doctors" DROP COLUMN "landline_number"`);
        await queryRunner.query(`ALTER TABLE "doctors" ADD "landline_number" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "doctors" ADD CONSTRAINT "UQ_47af744becc4ed27ac4796b344a" UNIQUE ("landline_number")`);
    }

}
