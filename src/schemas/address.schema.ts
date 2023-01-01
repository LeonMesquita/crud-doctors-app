import { IsInt, IsString } from 'class-validator';

export class AddressSchema {
  @IsString()
  cep: string;

  @IsString()
  street: string;

  @IsString()
  complement: string;

  @IsString()
  district: string;

  @IsString()
  city: string;

  @IsString()
  state: string;
}

export class Address {
  @IsInt()
  id: number;
}
