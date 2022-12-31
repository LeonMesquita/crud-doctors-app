import {
  IsString,
  MaxLength,
  IsArray,
  IsNumberString,
  IsInt,
  ArrayMinSize,
} from 'class-validator';

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

  @IsString()
  @IsNumberString()
  cep: string;

  @IsArray()
  @ArrayMinSize(2)
  // @ValidateNested({ each: true })
  // @Type(() => SpecialtyModel)
  specialties: Specialty[];
}

class Specialty {
  @IsInt()
  id: number;
}
