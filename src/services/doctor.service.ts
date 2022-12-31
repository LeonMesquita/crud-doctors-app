import { DoctorModel } from 'src/models/doctor.model';
import { DoctorSchema } from 'src/schemas/doctor.schema';
import { DoctorRepository } from 'src/repositories/doctor.repository';

export class DoctorService {
  constructor(private readonly doctorRepository: DoctorRepository) {}
  public async create(body: DoctorSchema): Promise<DoctorModel> {
    const createdDoctor = await this.doctorRepository.insert(body);
    return createdDoctor;
  }

  public async readOne(): Promise<string> {
    return '';
  }

  public async readAll(): Promise<string> {
    return '';
  }

  public async update(): Promise<string> {
    return '';
  }

  public async delete(): Promise<string> {
    return '';
  }
}
