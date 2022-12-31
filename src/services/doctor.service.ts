import { Injectable } from '@nestjs/common';
import { DoctorModel } from 'src/models/doctor.model';
import { DoctorSchema } from 'src/schemas/doctor.schema';
import { DoctorRepository } from 'src/repositories/doctor.repository';
import { DoctorUtils } from 'src/utils/doctor.utils';

@Injectable()
export class DoctorService {
  constructor(
    private readonly doctorRepository: DoctorRepository,

    private readonly doctorUtils: DoctorUtils,
  ) {}

  public async create(body: DoctorSchema): Promise<DoctorModel> {
    const createdDoctor = await this.doctorRepository.insert(body);
    return createdDoctor;
  }

  public async readOne(): Promise<string> {
    return '';
  }

  public async readAll(): Promise<DoctorModel[]> {
    return await this.doctorRepository.getAll();
  }

  public async update(): Promise<string> {
    return '';
  }

  public async delete(): Promise<string> {
    return '';
  }
}
