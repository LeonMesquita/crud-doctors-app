import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { DoctorController } from './controllers/doctor.controller';
import { DoctorService } from './services/doctor.service';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig)],
  controllers: [DoctorController],
  providers: [DoctorService],
})
export class AppModule {}
