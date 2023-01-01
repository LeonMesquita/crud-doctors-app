import { SpecialtyModel } from 'src/models/doctor.model';
import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';

export class SpecialtySeeder implements Seeder {
  async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<void> {
    const specialtyRepository = dataSource.getRepository(SpecialtyModel);

    const specialties = [
      {
        name: 'Alergologia',
      },
      {
        name: 'Angiologia',
      },
      {
        name: 'Buco maxilo',
      },
      {
        name: 'Cardiologia clínca',
      },
      {
        name: 'Cardiologia infantil',
      },
      {
        name: 'Cirurgia cabeça e pescoço',
      },
      {
        name: 'Cirurgia cardíaca',
      },
      {
        name: 'Cirurgia de tórax',
      },
    ];

    const newSpecialties = specialtyRepository.create(specialties);
    await specialtyRepository.save(newSpecialties);
  }
}
