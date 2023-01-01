import { Injectable, NotFoundException } from '@nestjs/common';
import { DoctorModel } from 'src/models/doctor.model';
import { DoctorBodySchema, DoctorSchema } from 'src/schemas/doctor.schema';
import { DoctorRepository } from 'src/repositories/doctor.repository';
import { searchCEP } from 'src/requisitions/search-cep';
import { AddressRepository } from 'src/repositories/address.repository';
import { AddressSchema } from 'src/schemas/address.schema';

@Injectable()
export class DoctorService {
  constructor(
    private readonly doctorRepository: DoctorRepository,
    private readonly addressRepository: AddressRepository,
  ) {}

  public async create(body: DoctorBodySchema): Promise<DoctorModel> {
    const doctorSchema = await this.setDoctorAddress(body);

    const createdDoctor = await this.doctorRepository.insert(doctorSchema);
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

  public async update(
    id: number,
    body: DoctorBodySchema,
  ): Promise<DoctorSchema> {
    const doctor = await this.doctorRepository.findOne(id);
    if (!doctor)
      throw new NotFoundException(`The doctor with id ${id} was not found`);
    const doctorSchema = await this.setDoctorAddress(body);

    return await this.doctorRepository.update(id, doctorSchema);
  }

  public async delete(id: number): Promise<string> {
    const doctor = await this.doctorRepository.findOne(id);
    if (!doctor)
      throw new NotFoundException(`The doctor with id ${id} was not found`);
    await this.doctorRepository.softDelete(id);
    return '';
  }

  public async setDoctorAddress(
    doctorBody: DoctorBodySchema,
  ): Promise<DoctorSchema> {
    let address = await this.addressRepository.findByCep(doctorBody.cep);
    if (!address) {
      const consultCep: AddressSchema = await searchCEP(doctorBody.cep);
      address = await this.addressRepository.insert(consultCep);
    }
    const { cep, ...doctor } = doctorBody;

    return {
      ...doctor,
      address: {
        id: address.id,
      },
    };
  }
}
