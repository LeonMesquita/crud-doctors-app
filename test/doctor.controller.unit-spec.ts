import { BadRequestException, NotFoundException } from '@nestjs/common';
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

const doctorsList: Array<DoctorModel> = [mockedDoctor];

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
            readOne: jest.fn().mockResolvedValue(mockedDoctor),
            readOneByParam: jest.fn().mockResolvedValue(mockedDoctor),
            readAll: jest.fn().mockResolvedValue(doctorsList),
            readManyByAddress: jest.fn().mockResolvedValue(doctorsList),
            update: jest.fn().mockResolvedValue(mockedDoctor),
            delete: jest.fn().mockResolvedValue('Doctor deleted'),
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

    it('should throw bad request exception on create', async () => {
      jest
        .spyOn(doctorService, 'create')
        .mockRejectedValueOnce(new BadRequestException());
      expect(doctorController.create(mockedDoctorSchema)).rejects.toThrowError(
        'Bad Request',
      );
    });
  });

  describe('readAll', () => {
    it('should return a list with all doctors', async () => {
      const response = await doctorController.readAll();
      expect(response).toEqual(doctorsList);
    });
  });

  describe('readById', () => {
    it('should return the created doctor', async () => {
      const response = await doctorController.readById(1);
      expect(response).toEqual(mockedDoctor);
    });

    it('should throw 404 exception', async () => {
      jest
        .spyOn(doctorService, 'readOne')
        .mockRejectedValueOnce(new NotFoundException());
      expect(doctorController.readById(1)).rejects.toThrowError('Not Found');
    });
  });

  describe('readOneByParam', () => {
    it('should return a doctor by a unique param', async () => {
      const response = await doctorController.readOne('data');
      expect(response).toEqual(mockedDoctor);
    });

    it('should throw 404 exception', async () => {
      jest
        .spyOn(doctorService, 'readOneByParam')
        .mockRejectedValueOnce(new NotFoundException());
      expect(doctorController.readOne('data')).rejects.toThrowError(
        'Not Found',
      );
    });
  });

  describe('readManyByAddress', () => {
    it('should return a list with all doctors by the address field', async () => {
      const response = await doctorController.readManyByAddress('data');
      expect(response).toEqual(doctorsList);
    });
  });

  describe('update', () => {
    it('should return the updated doctor', async () => {
      const response = await doctorController.update(1, mockedDoctorSchema);
      expect(response).toEqual(mockedDoctor);
    });

    it('should throw 404 exception on update', async () => {
      jest
        .spyOn(doctorService, 'update')
        .mockRejectedValueOnce(new NotFoundException());
      expect(
        doctorController.update(1, mockedDoctorSchema),
      ).rejects.toThrowError('Not Found');
    });
  });

  describe('delete', () => {
    it('should return the updated doctor', async () => {
      const response = await doctorController.delete(1);
      expect(response).toEqual('Doctor deleted');
    });

    it('should throw 404 exception on delete', async () => {
      jest
        .spyOn(doctorService, 'delete')
        .mockRejectedValueOnce(new NotFoundException());
      expect(doctorController.delete(1)).rejects.toThrowError('Not Found');
    });
  });
});
