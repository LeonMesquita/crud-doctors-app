import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { DoctorModel } from '../../src/models/doctor.model';
import {
  DoctorBodySchema,
  DoctorSchema,
} from '../../src/schemas/doctor.schema';
import { DoctorService } from '../services/doctor.service';

@Controller('/doctor')
export class DoctorController {
  constructor(private readonly doctorService: DoctorService) {}

  @Post()
  public async create(@Body() body: DoctorBodySchema): Promise<DoctorModel> {
    const createdDoctor = await this.doctorService.create(body);
    return createdDoctor;
  }

  @Get(':data')
  public async readOne(@Param('data') data: any): Promise<DoctorModel> {
    const doctor = await this.doctorService.readOneByParam(data);
    return doctor;
  }

  @Get('/address/:data')
  public async readMany(@Param('data') data: any): Promise<object[]> {
    const doctor = await this.doctorService.readManyByAddress(data);
    return doctor;
  }

  @Get()
  public async readAll(): Promise<DoctorModel[]> {
    return await this.doctorService.readAll();
  }

  @Put(':id')
  public async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: DoctorBodySchema,
  ): Promise<DoctorSchema> {
    const updatedDoctor = await this.doctorService.update(id, body);
    return updatedDoctor;
  }

  @Delete(':id')
  public async delete(@Param('id', ParseIntPipe) id: number): Promise<string> {
    await this.doctorService.delete(id);
    return '';
  }
}
