import { DataSource } from 'typeorm';
import { runSeeder, Seeder, SeederFactoryManager } from 'typeorm-extension';
import { ResetSeed } from './reset';
import { SpecialtySeeder } from './specialty.seed';

export class MainSeeder implements Seeder {
  async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<void> {
    await runSeeder(dataSource, ResetSeed);
    await runSeeder(dataSource, SpecialtySeeder);
  }
}
