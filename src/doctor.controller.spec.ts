import { Test, TestingModule } from '@nestjs/testing';
import { DoctorController } from './controllers/doctor.controller';
import { DoctorService } from './services/doctor.service';

describe('DoctorController', () => {
  let doctorController: DoctorController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [DoctorController],
      providers: [DoctorService],
    }).compile();

    doctorController = app.get<DoctorController>(DoctorController);
  });
});
