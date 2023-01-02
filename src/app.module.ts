import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from '../db/data-source';
import { DoctorModule } from './modules/doctor.module';

@Module({
  imports: [DoctorModule, TypeOrmModule.forRoot(dataSourceOptions)],
})
export class AppModule {}
