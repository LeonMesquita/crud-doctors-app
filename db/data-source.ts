import { DataSource, DataSourceOptions } from 'typeorm';
import { config } from 'dotenv';
import { SeederOptions } from 'typeorm-extension';
import { MainSeeder } from './seeds/main-seeder';
import { DoctorModel, SpecialtyModel } from '../src/models/doctor.model';
import { AddressModel } from '../src/models/address.model';
config();

export const dataSourceOptions: DataSourceOptions & SeederOptions = {
  type: 'postgres',
  url: process.env.DATABASE_URL,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  host: process.env.DB_HOST,
  synchronize: false,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [DoctorModel, SpecialtyModel, AddressModel], //[__dirname + '/../**/*.model.js'], //['dist/**/*.model.js'],
  migrations: ['dist/db/migrations/*.js'],
  seeds: [MainSeeder],
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;

// seeds: ['src/database/seeds/**/*{.ts,.js}'],
