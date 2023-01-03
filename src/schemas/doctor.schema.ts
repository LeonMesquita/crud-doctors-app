import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  MaxLength,
  IsArray,
  IsNumberString,
  IsInt,
  ArrayMinSize,
  IsObject,
  MinLength,
} from 'class-validator';
import { Address } from './address.schema';

export class DoctorBodySchema {
  @IsString()
  @MaxLength(120)
  @ApiProperty({
    description: 'Nome do médico com até 120 caracteres',
    example: 'João da Silva',
  })
  name: string;

  @IsString()
  @MaxLength(7)
  @IsNumberString()
  @ApiProperty({
    description:
      'Documento CRM do médito, podendo conter apenas números e com limite de 7 dígitos',
    example: '763459',
  })
  crm: string;

  @IsString()
  @IsNumberString()
  @MinLength(8)
  @MaxLength(8)
  @ApiProperty({
    description:
      'Número de telefone fixo do médico, podendo conter apenas números e com 8 dígitos',
    example: '98542367',
  })
  landline_number: string;

  @IsString()
  @IsNumberString()
  @MinLength(8)
  @MaxLength(11)
  @ApiProperty({
    description:
      'Número de telefone móvel do médico, podendo conter apenas números e entre 8 e 11 dígitos',
    example: '86994653256',
  })
  mobile_number: string;

  @IsString()
  @IsNumberString()
  @MinLength(8)
  @MaxLength(8)
  @ApiProperty({
    description:
      'CEP do endereço do médico, podendo conter apenas números e com 8 dígitos',
    example: '64207065',
  })
  cep: string;

  @IsArray()
  @ArrayMinSize(2)
  @ApiProperty({
    description:
      'Lista contendo  as especialidades médicas com no mínimo 2 itens. Cada item precisa ser um objeto com chave "id" e valor de 1 a 8',
    example: [
      {
        id: 2,
      },
      {
        id: 6,
      },
    ],
  })
  specialties: Specialty[];
}

export class DoctorSchema {
  @IsString()
  @MaxLength(120)
  @ApiProperty()
  name: string;

  @IsString()
  @MaxLength(7)
  @IsNumberString()
  crm: string;

  @IsString()
  @IsNumberString()
  @MinLength(8)
  @MaxLength(8)
  landline_number: string;

  @IsString()
  @IsNumberString()
  @MinLength(8)
  @MaxLength(11)
  mobile_number: string;

  @IsArray()
  @ArrayMinSize(2)
  specialties: Specialty[];

  @IsObject()
  address: Address;
}

export class Specialty {
  @IsInt()
  id: number;
}
