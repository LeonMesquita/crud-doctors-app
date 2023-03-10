import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { DoctorModel } from 'src/models/doctor.model';

describe('DoctorController (e2e)', () => {
  const apiUrl = '/doctors';
  let app: INestApplication;
  const doctor = {
    name: 'lorem ipsum',
    crm: '4536784',
    landline_number: '78654356',
    mobile_number: '86994214856',
    specialties: [
      {
        id: 4,
      },
      {
        id: 6,
      },
    ],
    cep: '64207065',
  };

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
      .post(`${apiUrl}`)
      .send(doctor)
      .expect(201);
  });

  it('should throw conflict error if doctor already exists', async () => {
    return request(app.getHttpServer())
      .post(`${apiUrl}`)
      .send(doctor)
      .expect(409);
  });

  it('should throw not found if any specialty id does not exist', async () => {
    return request(app.getHttpServer())
      .post(`${apiUrl}`)
      .send({
        ...doctor,
        specialties: [
          {
            id: 10,
          },
          {
            id: 20,
          },
        ],
      })
      .expect(404);
  });

  it('should get a list of all doctors', () => {
    return request(app.getHttpServer()).get(`${apiUrl}`).expect(200);
  });

  it('should get a doctor by id', async () => {
    return request(app.getHttpServer()).get(`${apiUrl}/id/1`).expect(200);
  });
  it('throw 404 if doctor was not found by id', async () => {
    return request(app.getHttpServer()).get(`${apiUrl}/id/0`).expect(404);
  });

  it('should get a doctor by name', async () => {
    return request(app.getHttpServer())
      .get(`${apiUrl}/data/${doctor.name}`)
      .expect(200);
  });

  it('throw 404 if doctor was not found by name', async () => {
    return request(app.getHttpServer())
      .get(`${apiUrl}/data/inexisting_name`)
      .expect(404);
  });

  it('should get a doctor by crm', async () => {
    return request(app.getHttpServer())
      .get(`${apiUrl}/data/${doctor.crm}`)
      .expect(200);
  });

  it('throw 404 if doctor was not found by crm', async () => {
    return request(app.getHttpServer())
      .get(`${apiUrl}/data/0000000`)
      .expect(404);
  });

  it('should get a doctor by landline number', async () => {
    return request(app.getHttpServer())
      .get(`${apiUrl}/data/${doctor.landline_number}`)
      .expect(200);
  });

  it('throw 404 if doctor was not found by landline number', async () => {
    return request(app.getHttpServer())
      .get(`${apiUrl}/data/00000000`)
      .expect(404);
  });

  it('should get a doctor by mobile number', async () => {
    return request(app.getHttpServer())
      .get(`${apiUrl}/data/${doctor.mobile_number}`)
      .expect(200);
  });

  it('throw 404 if doctor was not found by mobile number', async () => {
    return request(app.getHttpServer())
      .get(`${apiUrl}/data/00000000000`)
      .expect(404);
  });

  it('should get a list of doctors by cep', async () => {
    return request(app.getHttpServer())
      .get(`${apiUrl}/address/${doctor.cep}`)
      .expect(200);
  });

  it('should get a list of doctors by street', async () => {
    return request(app.getHttpServer())
      .get(`${apiUrl}/address/Rua dos Ara??jos`)
      .expect(200);
  });
  it('should get a list of doctors by complement', async () => {
    return request(app.getHttpServer())
      .get(`${apiUrl}/address/(M Universit??ria II)`)
      .expect(200);
  });
  it('should get a list of doctors by district', async () => {
    return request(app.getHttpServer())
      .get(`${apiUrl}/address/Frei Higino`)
      .expect(200);
  });
  it('should get a list of doctors by city', async () => {
    return request(app.getHttpServer())
      .get(`${apiUrl}/address/Parna??ba`)
      .expect(200);
  });
  it('should get a list of doctors by state', async () => {
    return request(app.getHttpServer()).get(`${apiUrl}/address/PI`).expect(200);
  });

  it('should update the doctor name', async () => {
    return request(app.getHttpServer())
      .put(`${apiUrl}/1`)
      .send({
        ...doctor,
        name: 'New Name',
      })
      .expect(200);
  });

  it('should update the doctor crm', async () => {
    return request(app.getHttpServer())
      .put(`${apiUrl}/1`)
      .send({
        ...doctor,
        crm: '4536791',
      })
      .expect(200);
  });

  it('should update the doctor landline number', async () => {
    return request(app.getHttpServer())
      .put(`${apiUrl}/1`)
      .send({
        ...doctor,
        landline_number: '78654356',
      })
      .expect(200);
  });

  it('should update the doctor mobile number', async () => {
    return request(app.getHttpServer())
      .put(`${apiUrl}/1`)
      .send({
        ...doctor,
        mobile_number: '994563678',
      })
      .expect(200);
  });

  it('should update the doctor address', async () => {
    return request(app.getHttpServer())
      .put(`${apiUrl}/1`)
      .send({
        ...doctor,
        cep: '20020050',
      })
      .expect(200);
  });

  it('should update the doctor specialties', async () => {
    return request(app.getHttpServer())
      .put(`${apiUrl}/1`)
      .send({
        ...doctor,
        specialties: [
          {
            id: 4,
          },
          {
            id: 6,
          },
        ],
      })
      .expect(200);
  });

  it('should throw 404 if the doctor was not found on update', async () => {
    return request(app.getHttpServer())
      .put(`${apiUrl}/0`)
      .send({
        ...doctor,
        name: 'New Name',
      })
      .expect(404);
  });

  it('should delete a doctor', async () => {
    return request(app.getHttpServer()).delete(`${apiUrl}/1`).expect(200);
  });

  it('should throw 404 if the doctor was not found on delete', async () => {
    return request(app.getHttpServer()).delete(`${apiUrl}/0`).expect(404);
  });
});
