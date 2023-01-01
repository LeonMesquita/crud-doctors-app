import {
  IsString,
  MaxLength,
  IsArray,
  IsNumberString,
  IsInt,
  ArrayMinSize,
  IsObject,
} from 'class-validator';
import { Address } from './address.schema';

export class DoctorBodySchema {
  @IsString()
  @MaxLength(120)
  name: string;

  @IsString()
  @MaxLength(7)
  @IsNumberString()
  crm: string;

  @IsString()
  @IsNumberString()
  landline_number: string;

  @IsString()
  @IsNumberString()
  mobile_number: string;

  @IsString()
  @IsNumberString()
  cep: string;

  @IsArray()
  @ArrayMinSize(2)
  // @ValidateNested({ each: true })
  // @Type(() => SpecialtyModel)
  specialties: Specialty[];
}

export class DoctorSchema {
  @IsString()
  @MaxLength(120)
  name: string;

  @IsString()
  @MaxLength(7)
  @IsNumberString()
  crm: string;

  @IsString()
  @IsNumberString()
  landline_number: string;

  @IsString()
  @IsNumberString()
  mobile_number: string;

  @IsArray()
  @ArrayMinSize(2)
  specialties: Specialty[];

  @IsObject()
  address: Address;
}

class Specialty {
  @IsInt()
  id: number;
}
