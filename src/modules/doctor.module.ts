import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DoctorController } from 'src/controllers/doctor.controller';
import { DoctorModel, SpecialtyModel } from 'src/models/doctor.model';
import { DoctorRepository } from 'src/repositories/doctor.repository';
import { DoctorService } from 'src/services/doctor.service';

@Module({
  imports: [TypeOrmModule.forFeature([DoctorModel, SpecialtyModel])],
  controllers: [DoctorController],
  providers: [DoctorService, DoctorRepository],
})
export class DoctorModule {}
