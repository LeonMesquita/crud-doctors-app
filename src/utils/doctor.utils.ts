import { BadRequestException } from '@nestjs/common';

export class DoctorUtils {
  public validateSpecialties(specialties: number[]) {
    if (specialties.length < 2)
      throw new BadRequestException(
        `The doctor must have at least 2 specialties`,
      );
  }
}
