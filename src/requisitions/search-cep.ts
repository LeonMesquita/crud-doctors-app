import { NotFoundException } from '@nestjs/common';
import axios from 'axios';
import { AddressSchema } from '../schemas/address.schema';
export async function searchCEP(cep: string): Promise<AddressSchema> {
  const url = `https://viacep.com.br/ws/${cep}/json/`;
  try {
    const res = await axios.get(url);
    const apiResponse: AddressInterface = res.data;
    const address: AddressSchema = {
      cep: apiResponse.cep,
      street: apiResponse.logradouro,
      district: apiResponse.bairro,
      complement: apiResponse.complemento,
      city: apiResponse.localidade,
      state: apiResponse.uf,
    };
    return address;
  } catch (err) {
    throw new NotFoundException(`Incorrect or inexisting postal code`);
  }
}

interface AddressInterface {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  ibge: string;
  gia: string;
  ddd: string;
  siafi: string;
}
