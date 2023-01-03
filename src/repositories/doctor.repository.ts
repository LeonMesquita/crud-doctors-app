import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import dataSource from 'db/data-source';
import { AddressModel } from '../../src/models/address.model';
import { DoctorModel } from '../../src/models/doctor.model';
import {
  DoctorBodySchema,
  DoctorSchema,
} from '../../src/schemas/doctor.schema';
import { Like, Repository } from 'typeorm';

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

  public async findById(id: number): Promise<DoctorModel> {
    const doctor = await this.model.findOneBy({ id });
    return doctor;
  }

  public async findOneByParam(data: any): Promise<DoctorModel> {
    const doctor = await this.model.findOne({
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
    const doctors = await this.model
      .createQueryBuilder('doctors')
      .select([
        'doctors.id',
        'doctors.name',
        'doctors.crm',
        'doctors.landline_number',
        'doctors.mobile_number',
        'a.street as street',
      ])
      .where('doctors."addressId" = a.id')
      .andWhere(
        'a.street = :data or a.cep = :data or a.district = :data or a.city = :data or a.state = :data or a.complement = :data',
        {
          data,
        },
      )
      .innerJoinAndSelect(AddressModel, 'a')
      .getMany();

    return doctors;
  }

  public async update(id: number, body: DoctorSchema): Promise<DoctorSchema> {
    const instance = await this.model.findOneBy({ id });
    Object.assign(instance, body);
    return await this.model.save(instance);
  }

  public async softDelete(id: number): Promise<void> {
    await this.model.softDelete(id);
  }
}
