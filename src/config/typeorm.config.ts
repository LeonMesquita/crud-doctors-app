import { TypeOrmModuleOptions } from '@nestjs/typeorm';
export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  url: 'postgres://postgres:112233@localhost:5432/crud_doctors_db',
  synchronize: true,
  entities: ['dist/**/*.model.js'],
};
