import { DataSource } from 'typeorm';
import { runSeeder, Seeder, SeederFactoryManager } from 'typeorm-extension';
import { SpecialtySeeder } from './specialty.seed';

export class MainSeeder implements Seeder {
  async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<void> {
    await runSeeder(dataSource, SpecialtySeeder);
  }
}
