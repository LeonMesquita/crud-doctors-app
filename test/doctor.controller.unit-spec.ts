import { Test, TestingModule } from '@nestjs/testing';
import { AddressModel } from 'src/models/address.model';
import { DoctorModel } from 'src/models/doctor.model';
import { DoctorBodySchema } from 'src/schemas/doctor.schema';
import { DoctorController } from '../src/controllers/doctor.controller';
import { DoctorService } from '../src/services/doctor.service';

const mockedAddress: AddressModel = {
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

const mockedDoctor: DoctorModel = {
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

const mockedDoctorSchema: DoctorBodySchema = {
  name: 'any name',
  crm: '0000000',
  landline_number: '00000000',
  mobile_number: '00000000000',
  specialties: [],
  cep: '00000000',
};

describe('DoctorController', () => {
  let doctorController: DoctorController;
  let doctorService: DoctorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DoctorController],
      providers: [
        {
          provide: DoctorService,
          useValue: {
            create: jest.fn().mockResolvedValue(mockedDoctor),
            readOne: jest.fn(),
            readOneByParam: jest.fn(),
            readAll: jest.fn(),
            readManyByAddress: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
            setDoctorAddress: jest.fn(),
            checkSpecialties: jest.fn(),
            checkDoctorExists: jest.fn(),
          },
        },
      ],
    }).compile();

    doctorController = module.get<DoctorController>(DoctorController);
    doctorService = module.get<DoctorService>(DoctorService);
  });
  it('should be defined', () => {
    expect(doctorController).toBeDefined();
    expect(doctorService).toBeDefined();
  });

  describe('create', () => {
    it('should return the created doctor', async () => {
      const response = await doctorController.create(mockedDoctorSchema);
      expect(response).toEqual(mockedDoctor);
    });
  });
});
