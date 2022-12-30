import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DoctorController } from 'src/controllers/doctor.controller';
import {
  DoctorModel,
  SpecialtyModel,
  SpecialtiesDoctors,
} from 'src/models/doctor.model';

@Module({
  imports: [
    TypeOrmModule.forFeature([DoctorModel, SpecialtyModel, SpecialtiesDoctors]),
  ],
  controllers: [DoctorController],
})
export class DoctorModule {}
