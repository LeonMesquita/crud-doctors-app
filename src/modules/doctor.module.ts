import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DoctorController } from '../../src/controllers/doctor.controller';
import { AddressModel } from '../../src/models/address.model';
import { DoctorModel } from '../../src/models/doctor.model';
import { SpecialtyModel } from '../../src/models/specialty.model';
import { AddressRepository } from '../../src/repositories/address.repository';
import { DoctorRepository } from '../../src/repositories/doctor.repository';
import { DoctorService } from '../../src/services/doctor.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([DoctorModel, SpecialtyModel, AddressModel]),
  ],
  controllers: [DoctorController],
  providers: [DoctorService, DoctorRepository, AddressRepository],
})
export class DoctorModule {}
