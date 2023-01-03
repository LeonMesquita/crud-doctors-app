import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString } from 'class-validator';

export class AddressSchema {
  @IsString()
  @ApiProperty()
  cep: string;

  @IsString()
  @ApiProperty()
  street: string;

  @IsString()
  @ApiProperty()
  complement: string;

  @IsString()
  @ApiProperty()
  district: string;

  @IsString()
  @ApiProperty()
  city: string;

  @IsString()
  @ApiProperty()
  state: string;
}

export class Address {
  @IsInt()
  id: number;
}
