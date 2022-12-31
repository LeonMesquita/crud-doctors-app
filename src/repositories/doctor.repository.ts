import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DoctorModel } from 'src/models/doctor.model';
import { DoctorSchema } from 'src/schemas/doctor.schema';
import { Repository } from 'typeorm';

@Injectable()
export class DoctorRepository {
  constructor(
    @InjectRepository(DoctorModel) private model: Repository<DoctorModel>,
  ) {}
  public async insert(body: DoctorSchema): Promise<DoctorModel> {
    const createdDoctor = await this.model.save(body);
    return createdDoctor;
  }

  public async findAll(): Promise<DoctorModel[]> {
    const doctors = await this.model.find();
    return doctors;
  }

  public async findOne(id: number): Promise<DoctorModel> {
    const doctor = await this.model.findOneBy({ id });
    return doctor;
  }

  public async update(id: number, body: DoctorSchema): Promise<DoctorSchema> {
    const instance = await this.model.findOneBy({ id });
    Object.assign(instance, body);
    return await this.model.save(instance);
  }

  public async softDelete(id: number): Promise<string> {
    await this.model.delete(id);

    return '';
  }
}
