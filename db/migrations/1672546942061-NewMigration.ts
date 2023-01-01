import { MigrationInterface, QueryRunner } from "typeorm";

export class NewMigration1672546942061 implements MigrationInterface {
    name = 'NewMigration1672546942061'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "doctors" ("id" SERIAL NOT NULL, "name" character varying(120) NOT NULL, "crm" character varying(7) NOT NULL, "landline_number" character varying NOT NULL, "mobile_number" character varying NOT NULL, "cep" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "UQ_d7e8212b37dd4e61e996d7289cd" UNIQUE ("crm"), CONSTRAINT "UQ_47af744becc4ed27ac4796b344a" UNIQUE ("landline_number"), CONSTRAINT "UQ_8ea1247f4242cb8a6d9db820ba5" UNIQUE ("mobile_number"), CONSTRAINT "PK_8207e7889b50ee3695c2b8154ff" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "specialties" ("id" SERIAL NOT NULL, "name" character varying(120) NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "UQ_565f38f8b0417c7dbd40e429782" UNIQUE ("name"), CONSTRAINT "PK_ba01cec5aa8ac48778a1d097e98" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "doctors_specialties_specialties" ("doctorsId" integer NOT NULL, "specialtiesId" integer NOT NULL, CONSTRAINT "PK_ef94cc3f0a4c6b9ae4a87a82ba9" PRIMARY KEY ("doctorsId", "specialtiesId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_817e528955e896e04db1011885" ON "doctors_specialties_specialties" ("doctorsId") `);
        await queryRunner.query(`CREATE INDEX "IDX_d39e69aa744b9d688a9d5cd99b" ON "doctors_specialties_specialties" ("specialtiesId") `);
        await queryRunner.query(`CREATE TABLE "specialties_doctors_doctors" ("specialtiesId" integer NOT NULL, "doctorsId" integer NOT NULL, CONSTRAINT "PK_8579617cdb83f27f1411b572a75" PRIMARY KEY ("specialtiesId", "doctorsId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_6a9f5e0257cf296bc760abd9dc" ON "specialties_doctors_doctors" ("specialtiesId") `);
        await queryRunner.query(`CREATE INDEX "IDX_2751702d8551a917c2a4da362b" ON "specialties_doctors_doctors" ("doctorsId") `);
        await queryRunner.query(`ALTER TABLE "doctors_specialties_specialties" ADD CONSTRAINT "FK_817e528955e896e04db10118858" FOREIGN KEY ("doctorsId") REFERENCES "doctors"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "doctors_specialties_specialties" ADD CONSTRAINT "FK_d39e69aa744b9d688a9d5cd99bb" FOREIGN KEY ("specialtiesId") REFERENCES "specialties"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "specialties_doctors_doctors" ADD CONSTRAINT "FK_6a9f5e0257cf296bc760abd9dc2" FOREIGN KEY ("specialtiesId") REFERENCES "specialties"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "specialties_doctors_doctors" ADD CONSTRAINT "FK_2751702d8551a917c2a4da362be" FOREIGN KEY ("doctorsId") REFERENCES "doctors"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "specialties_doctors_doctors" DROP CONSTRAINT "FK_2751702d8551a917c2a4da362be"`);
        await queryRunner.query(`ALTER TABLE "specialties_doctors_doctors" DROP CONSTRAINT "FK_6a9f5e0257cf296bc760abd9dc2"`);
        await queryRunner.query(`ALTER TABLE "doctors_specialties_specialties" DROP CONSTRAINT "FK_d39e69aa744b9d688a9d5cd99bb"`);
        await queryRunner.query(`ALTER TABLE "doctors_specialties_specialties" DROP CONSTRAINT "FK_817e528955e896e04db10118858"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_2751702d8551a917c2a4da362b"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_6a9f5e0257cf296bc760abd9dc"`);
        await queryRunner.query(`DROP TABLE "specialties_doctors_doctors"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_d39e69aa744b9d688a9d5cd99b"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_817e528955e896e04db1011885"`);
        await queryRunner.query(`DROP TABLE "doctors_specialties_specialties"`);
        await queryRunner.query(`DROP TABLE "specialties"`);
        await queryRunner.query(`DROP TABLE "doctors"`);
    }

}
