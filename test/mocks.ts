import { AddressModel } from '../src/models/address.model';
import { DoctorModel } from '../src/models/doctor.model';
import { DoctorBodySchema } from '../src/schemas/doctor.schema';

export const mockedAddress: AddressModel = {
  id: 1,
  cep: '00000000',
  street: 'any street',
  complement: 'any complement',
  district: 'any district',
  city: 'any city',
  state: 'any state',
  createdAt: undefined,
  updatedAt: undefined,
  deletedAt: undefined,
  doctors: [],
};

export const mockedDoctor: DoctorModel = {
  id: 1,
  name: 'any name',
  crm: '0000000',
  landline_number: '00000000',
  mobile_number: '00000000000',
  specialties: [],
  address: mockedAddress,
  createdAt: undefined,
  updatedAt: undefined,
  deletedAt: undefined,
};

export const mockedDoctorSchema: DoctorBodySchema = {
  name: 'any name',
  crm: '0000000',
  landline_number: '00000000',
  mobile_number: '00000000000',
  specialties: [],
  cep: '00000000',
};

export const doctorsList: Array<DoctorModel> = [mockedDoctor];
