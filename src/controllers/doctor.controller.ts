import { Controller, Get } from '@nestjs/common';
import { DoctorService } from '../services/doctor.service';

@Controller()
export class DoctorController {
  constructor(private readonly doctorService: DoctorService) {}

  @Get('/doctor')
  getHello(): string {
    return this.doctorService.getHello();
  }
}
