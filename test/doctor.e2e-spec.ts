import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('DoctorController (e2e)', () => {
  const apiUrl = '/doctors';
  let app: INestApplication;
  const doctor = {
    name: 'lorem ipsum',
    crm: '4536784',
    landline_number: '4536345',
    mobile_number: '43546324',
    specialties: [1, 2],
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

  // it('should throw 400 if the name has more than 120 characters', async () => {
  //   return request(app.getHttpServer())
  //     .post('${apiUrl}')
  //     .send({
  //       ...doctor
  //     })
  //     .expect(400);
  // });

  it('should create a new doctor', async () => {
    return request(app.getHttpServer())
      .post(`${apiUrl}`)
      .send(doctor)
      .expect(201);
  });
  it('should get a list of all doctors', () => {
    return request(app.getHttpServer()).get(`${apiUrl}`).expect(200);
  });

  it('should get a doctor by id', async () => {
    return request(app.getHttpServer()).get(`${apiUrl}/1`).expect(200);
  });
  it('should get a doctor by crm', async () => {
    return request(app.getHttpServer()).get(`${apiUrl}/4536784`).expect(200);
  });
  it('should get a doctor by landline number', async () => {
    return request(app.getHttpServer()).get(`${apiUrl}/4536345`).expect(200);
  });
  it('should get a doctor by mobile number', async () => {
    return request(app.getHttpServer()).get(`${apiUrl}/43546324`).expect(200);
  });
  it('should get a list of doctors by cep', async () => {
    return request(app.getHttpServer())
      .get(`${apiUrl}/address/64207065`)
      .expect(200);
  });
  it('should get a list of doctors by street', async () => {
    return request(app.getHttpServer())
      .get(`${apiUrl}/address/Rua dos Araújos`)
      .expect(200);
  });
  it('should get a list of doctors by complement', async () => {
    return request(app.getHttpServer())
      .get(`${apiUrl}/address/(M Universitária II)`)
      .expect(200);
  });
  it('should get a list of doctors by district', async () => {
    return request(app.getHttpServer())
      .get(`${apiUrl}/address/Frei Higino`)
      .expect(200);
  });
  it('should get a list of doctors by city', async () => {
    return request(app.getHttpServer())
      .get(`${apiUrl}/address/Parnaíba`)
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
        landline_number: '7865435674',
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
        specialties: [3, 6],
      })
      .expect(200);
  });

  it('should delete a doctor', async () => {
    return request(app.getHttpServer()).delete(`${apiUrl}/1`).expect(200);
  });
});
