import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { DoctorModel } from 'src/models/doctor.model';
import { DoctorSchema } from 'src/schemas/doctor.schema';
import { DoctorService } from '../services/doctor.service';

@Controller('/doctor')
export class DoctorController {
  constructor(private readonly doctorService: DoctorService) {}

  @Post()
  public async create(@Body() body: DoctorSchema): Promise<DoctorModel> {
    const createdDoctor = await this.doctorService.create(body);
    return createdDoctor;
  }

  @Get(':id')
  public async readOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<DoctorModel> {
    const doctor = await this.doctorService.readOne(id);
    return doctor;
  }

  @Get()
  public async readAll(): Promise<DoctorModel[]> {
    return await this.doctorService.readAll();
  }

  @Put(':id')
  public async update(): Promise<string> {
    return '';
  }

  @Delete(':id')
  public async delete(): Promise<string> {
    return '';
  }
}
