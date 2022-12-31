// import { Injectable } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { SpecialtiesDoctors } from 'src/models/doctor.model';
// import { Repository } from 'typeorm';

// @Injectable()
// export class SpecialtiesDoctorsRepository {
//   constructor(
//     @InjectRepository(SpecialtiesDoctors)
//     private model: Repository<SpecialtiesDoctors>,
//   ) {}
//   public async insert(
//     specialties: number[],
//     doctorId: number,
//   ): Promise<string> {
//     specialties.forEach(
//       async (item) =>
//         await this.model.save({
//           id: 1,
//           specialtyId: item,
//           doctorId,
//         }),
//     );

//     return 'OK';
//   }

//   // public async get(): Promise<SpecialtiesDoctors[]> {
//   //   const body = {
//   //     specialtyId: 1,
//   //     doctorId: 2,
//   //   };
//   //   const data = await this.model.save(body);
//   //   return data;
//   // }
// }
