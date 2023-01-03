import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { DoctorModel } from '../../src/models/doctor.model';
import {
  DoctorBodySchema,
  DoctorSchema,
  Specialty,
} from '../../src/schemas/doctor.schema';
import { DoctorRepository } from '../../src/repositories/doctor.repository';
import { searchCEP } from '../../src/requisitions/search-cep';
import { AddressRepository } from '../../src/repositories/address.repository';
import { AddressSchema } from '../../src/schemas/address.schema';

@Injectable()
export class DoctorService {
  constructor(
    private readonly doctorRepository: DoctorRepository,
    private readonly addressRepository: AddressRepository,
  ) {}

  public async create(body: DoctorBodySchema): Promise<DoctorModel> {
    const doctorSchema = await this.setDoctorAddress(body);
    await this.checkSpecialties(body.specialties);
    await this.checkDoctorExists(body);

    const createdDoctor = await this.doctorRepository.insert(doctorSchema);
    return createdDoctor;
  }

  public async readOne(id: number): Promise<DoctorModel> {
    const doctor = await this.doctorRepository.findById(id);
    if (!doctor)
      throw new NotFoundException(`The doctor with id ${id} was not found`);
    return doctor;
  }

  public async readOneByParam(data: any): Promise<DoctorModel> {
    const doctor = await this.doctorRepository.findOneByParam(data);
    if (!doctor) throw new NotFoundException(`The doctor was not found`);
    return doctor;
  }

  public async readAll(): Promise<DoctorModel[]> {
    return await this.doctorRepository.findAll();
  }

  public async readManyByAddress(data: any): Promise<object[]> {
    const doctor = await this.doctorRepository.findManyByAddress(data);
    return doctor;
  }

  public async update(
    id: number,
    body: DoctorBodySchema,
  ): Promise<DoctorSchema> {
    const doctor = await this.doctorRepository.findById(id);
    if (!doctor)
      throw new NotFoundException(`The doctor with id ${id} was not found`);
    const doctorSchema = await this.setDoctorAddress(body);

    return await this.doctorRepository.update(id, doctorSchema);
  }

  public async delete(id: number): Promise<string> {
    const doctor = await this.doctorRepository.findById(id);
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

  public async checkSpecialties(specialties: Specialty[]): Promise<void> {
    for (const item of specialties) {
      const specialty = await this.doctorRepository.getSpecialtyById(item.id);
      if (!specialty)
        throw new NotFoundException(
          `The specialty with id ${item.id} was not found`,
        );
    }
  }

  public async checkDoctorExists(body: DoctorBodySchema): Promise<void> {
    let doctor: DoctorModel;
    doctor = await this.doctorRepository.findOneByParam(body.name);
    doctor = await this.doctorRepository.findOneByParam(body.crm);
    doctor = await this.doctorRepository.findOneByParam(body.landline_number);
    doctor = await this.doctorRepository.findOneByParam(body.mobile_number);

    if (!doctor) return;
    else if (doctor.name === body.name)
      throw new ConflictException('There is already a doctor with this name');
    else if (doctor.crm === body.crm)
      throw new ConflictException('There is already a doctor with this crm');
    else if (doctor.landline_number === body.landline_number)
      throw new ConflictException(
        'There is already a doctor with this landline number',
      );
    else if (doctor.mobile_number === body.mobile_number)
      throw new ConflictException(
        'There is already a doctor with this mobile number',
      );
  }
}
