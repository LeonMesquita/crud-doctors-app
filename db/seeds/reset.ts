import { DoctorModel } from '../../src/models/doctor.model';
import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';

export class ResetSeed implements Seeder {
  async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<void> {
    const doctorRepository = dataSource.getRepository(DoctorModel);
    await doctorRepository.query(
      `TRUNCATE TABLE doctors RESTART IDENTITY CASCADE;`,
    );
  }
}
