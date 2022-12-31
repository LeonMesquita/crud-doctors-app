import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DoctorController } from 'src/controllers/doctor.controller';
import {
  DoctorModel,
  SpecialtyModel,
  SpecialtiesDoctors,
} from 'src/models/doctor.model';
import { DoctorRepository } from 'src/repositories/doctor.repository';
import { DoctorService } from 'src/services/doctor.service';
import { DoctorUtils } from 'src/utils/doctor.utils';

@Module({
  imports: [
    TypeOrmModule.forFeature([DoctorModel, SpecialtyModel, SpecialtiesDoctors]),
  ],
  controllers: [DoctorController],
  providers: [DoctorService, DoctorRepository, DoctorUtils],
})
export class DoctorModule {}
