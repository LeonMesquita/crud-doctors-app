import { Injectable, NotFoundException } from '@nestjs/common';
import { DoctorModel } from 'src/models/doctor.model';
import { DoctorSchema } from 'src/schemas/doctor.schema';
import { DoctorRepository } from 'src/repositories/doctor.repository';

@Injectable()
export class DoctorService {
  constructor(private readonly doctorRepository: DoctorRepository) {}

  public async create(body: DoctorSchema): Promise<DoctorModel> {
    const createdDoctor = await this.doctorRepository.insert(body);
    return createdDoctor;
  }

  public async readOne(id: number): Promise<DoctorModel> {
    const doctor = await this.doctorRepository.findOne(id);
    if (!doctor)
      throw new NotFoundException(`The doctor with id ${id} was not found`);
    return doctor;
  }

  public async readAll(): Promise<DoctorModel[]> {
    return await this.doctorRepository.findAll();
  }

  public async update(): Promise<string> {
    return '';
  }

  public async delete(): Promise<string> {
    return '';
  }
}
