import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import dataSource from 'db/data-source';
import { AddressModel } from '../../src/models/address.model';
import { DoctorModel } from '../../src/models/doctor.model';
import { SpecialtyModel } from '../../src/models/specialty.model';

import {
  DoctorBodySchema,
  DoctorSchema,
} from '../../src/schemas/doctor.schema';
import { Like, Repository } from 'typeorm';

@Injectable()
export class DoctorRepository {
  constructor(
    @InjectRepository(DoctorModel)
    private doctorRepository: Repository<DoctorModel>,
    @InjectRepository(SpecialtyModel)
    private specialtyRepository: Repository<SpecialtyModel>,
  ) {}
  public async insert(body: DoctorSchema): Promise<DoctorModel> {
    const createdDoctor = await this.doctorRepository.save(body);
    return createdDoctor;
  }

  public async findAll(): Promise<DoctorModel[]> {
    const doctors = await this.doctorRepository.find();
    return doctors;
  }

  public async findById(id: number): Promise<DoctorModel> {
    const doctor = await this.doctorRepository.findOneBy({ id });
    return doctor;
  }

  public async findOneByParam(data: any): Promise<DoctorModel> {
    const doctor = await this.doctorRepository.findOne({
      where: [
        { name: data },
        { crm: data },
        { landline_number: data },
        { mobile_number: data },
      ],
    });
    return doctor;
  }

  public async findManyByAddress(data: any): Promise<object[]> {
    const doctors = await this.doctorRepository.query(`
      SELECT d.*, json_build_object('id', a.id, 'cep', a.cep, 'street', a.street, 'complement', a.complement, 'district',
      a.district, 'city', a.city, 'state', a.state) as address      
      FROM DOCTORS d
      JOIN addresses a
      ON d."addressId" = a.id
    `);

    return doctors;
  }

  public async update(id: number, body: DoctorSchema): Promise<DoctorSchema> {
    const instance = await this.doctorRepository.findOneBy({ id });
    Object.assign(instance, body);
    return await this.doctorRepository.save(instance);
  }

  public async softDelete(id: number): Promise<void> {
    await this.doctorRepository.softDelete(id);
  }

  public async getSpecialtyById(id: number): Promise<SpecialtyModel> {
    return await this.specialtyRepository.findOneBy({ id });
  }
}
