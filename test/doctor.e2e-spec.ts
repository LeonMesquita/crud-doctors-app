import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { clearDB } from '../db/reset-db';
import dataSource from '../db/data-source';
import { DoctorModel } from '../src/models/doctor.model';

describe('DoctorController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should create a new doctor', async () => {
    return request(app.getHttpServer())
      .post('/doctor')
      .send({
        name: 'lorem ipsum',
        crm: '4536784',
        landline_number: '4536345',
        mobile_number: '43546324',
        specialties: [1, 2],
        cep: '64207065',
      })
      .expect(201);
  });
  it('should get a list of all doctors', () => {
    return request(app.getHttpServer()).get('/doctor').expect(200);
  });

  it('should get a doctor by id', async () => {
    return request(app.getHttpServer()).get('/doctor/1').expect(200);
  });
  it('should get a doctor by crm', async () => {
    return request(app.getHttpServer()).get('/doctor/4536784').expect(200);
  });
  it('should get a doctor by landline number', async () => {
    return request(app.getHttpServer()).get('/doctor/4536345').expect(200);
  });
  it('should get a doctor by mobile number', async () => {
    return request(app.getHttpServer()).get('/doctor/43546324').expect(200);
  });
  it('should get a list of doctors by cep', async () => {
    return request(app.getHttpServer())
      .get('/doctor/address/64207065')
      .expect(200);
  });
  it('should get a list of doctors by street', async () => {
    return request(app.getHttpServer())
      .get('/doctor/address/Rua dos Araújos')
      .expect(200);
  });
});
