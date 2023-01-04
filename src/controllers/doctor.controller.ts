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
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { DoctorModel } from '../../src/models/doctor.model';
import {
  DoctorBodySchema,
  DoctorSchema,
} from '../../src/schemas/doctor.schema';
import { DoctorService } from '../services/doctor.service';

@ApiTags('Doctors')
@Controller('/doctors')
export class DoctorController {
  constructor(private readonly doctorService: DoctorService) {}

  @Post()
  @ApiOperation({ summary: 'Criar um novo médico' })
  @ApiResponse({
    status: 201,
    description: 'Médico criado com sucesso',
    type: DoctorModel,
  })
  @ApiResponse({ status: 400, description: 'Parâmetros inválidos' })
  @ApiResponse({
    status: 409,
    description: 'Atributo(s) único(s) já existente(s)',
  })
  @ApiResponse({ status: 404, description: 'CEP não encontrado' })
  public async create(@Body() body: DoctorBodySchema): Promise<DoctorModel> {
    const createdDoctor = await this.doctorService.create(body);
    return createdDoctor;
  }

  @Get()
  @ApiOperation({ summary: 'Retornar todos os médicos' })
  @ApiResponse({
    status: 200,
    description: 'Médicos retornados com sucesso',
    type: DoctorModel,
    isArray: true,
  })
  public async readAll(): Promise<DoctorModel[]> {
    return await this.doctorService.readAll();
  }
  @Get('/id/:id')
  @ApiOperation({
    summary: 'Retornar um médico pelo id',
  })
  @ApiResponse({
    status: 200,
    description: 'Médico retornado com sucesso',
    type: DoctorModel,
  })
  @ApiResponse({ status: 404, description: 'Médico não encontrado' })
  public async readById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<DoctorModel> {
    const doctor = await this.doctorService.readOne(id);
    return doctor;
  }

  @Get('/data/:data')
  @ApiOperation({
    summary:
      'Retornar um médico por um de seus campos únicos (nome, CRM ou telefones)',
  })
  @ApiResponse({
    status: 200,
    description: 'Médico retornado com sucesso',
    type: DoctorModel,
  })
  @ApiResponse({ status: 404, description: 'Médico não encontrado' })
  public async readOne(@Param('data') data: any): Promise<DoctorModel> {
    const doctor = await this.doctorService.readOneByParam(data);
    return doctor;
  }

  @Get('/address/:data')
  @ApiOperation({
    summary:
      'Retornar uma lista de médicos por um dos campos do endereço (cep, complemento, rua, bairro, cidade ou estado)',
  })
  @ApiResponse({
    status: 200,
    description: 'Médicos retornados com sucesso',
    type: DoctorModel,
    isArray: true,
  })
  public async readManyByAddress(@Param('data') data: any): Promise<object[]> {
    const doctor = await this.doctorService.readManyByAddress(data);
    return doctor;
  }

  @Put(':id')
  @ApiOperation({ summary: 'Editar os dados de um médico' })
  @ApiResponse({
    status: 200,
    description: 'Médico atualizado com sucesso',
    type: DoctorModel,
  })
  @ApiResponse({ status: 404, description: 'Médico não encontrado' })
  @ApiResponse({ status: 400, description: 'Parâmetros inválidos' })
  public async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: DoctorBodySchema,
  ): Promise<DoctorSchema> {
    const updatedDoctor = await this.doctorService.update(id, body);
    return updatedDoctor;
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deletar um médico' })
  @ApiResponse({ status: 200, description: 'Médico deletado com sucesso' })
  @ApiResponse({ status: 404, description: 'Médico não encontrado' })
  public async delete(@Param('id', ParseIntPipe) id: number): Promise<string> {
    const response = await this.doctorService.delete(id);
    return response;
  }
}
