import { IsString, MaxLength, IsArray } from 'class-validator';

export class DoctorSchema {
  @IsString()
  @MaxLength(120)
  name: string;

  @IsString()
  @MaxLength(7)
  crm: string;

  @IsString()
  landline_number: string;

  @IsString()
  mobile_number: string;

  @IsString()
  cep: string;

  @IsArray()
  specialties: Array<number>;
}
