import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfigAsync } from './config/typeorm.config';
import { DoctorModule } from './modules/doctor.module';

@Module({
  imports: [DoctorModule, TypeOrmModule.forRootAsync(typeOrmConfigAsync)],
})
export class AppModule {}
