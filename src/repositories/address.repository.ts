import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AddressModel } from 'src/models/address.model';
import { AddressSchema } from 'src/schemas/address.schema';
import { Repository } from 'typeorm';

@Injectable()
export class AddressRepository {
  constructor(
    @InjectRepository(AddressModel) private model: Repository<AddressModel>,
  ) {}

  public async insert(body: AddressSchema): Promise<AddressModel> {
    return await this.model.save(body);
  }

  public async findByCep(cep: string): Promise<AddressModel> {
    return await this.model.findOneBy({ cep });
  }
}
