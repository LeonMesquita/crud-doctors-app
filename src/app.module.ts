import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { DoctorModule } from './modules/doctor.module';

@Module({
  imports: [DoctorModule, TypeOrmModule.forRoot(typeOrmConfig)],
})
export class AppModule {}
