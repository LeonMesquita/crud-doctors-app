import { DataSource, DataSourceOptions } from 'typeorm';
import { config } from 'dotenv';
import { SeederOptions } from 'typeorm-extension';
import { MainSeeder } from './seeds/main-seeder';
config();

export const dataSourceOptions: DataSourceOptions & SeederOptions = {
  type: 'postgres',
  url: process.env.DATABASE_URL,
  synchronize: false,
  entities: ['dist/**/*.model.js'],
  migrations: ['dist/db/migrations/*.js'],
  seeds: [MainSeeder],
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;

// seeds: ['src/database/seeds/**/*{.ts,.js}'],
