import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';

@Entity()
export class DoctorModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 120 })
  name: string;

  @Column('int', { unique: true })
  crm: number;

  @Column('int', { unique: true })
  landline_number: number;

  @Column('int', { unique: true })
  mobile_number: number;

  @Column('int')
  cep: number;

  @Column('array')
  medical_specialties: string[];

  @OneToMany(
    () => SpecialtiesDoctors,
    (specialties_doctors: SpecialtiesDoctors) => specialties_doctors.specialty,
  )
  public specialties_doctors: SpecialtiesDoctors[];
}

@Entity()
export class SpecialtyModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 120, unique: true })
  name: string;

  @OneToMany(
    () => SpecialtiesDoctors,
    (specialties_doctors: SpecialtiesDoctors) => specialties_doctors.specialty,
  )
  public specialties_doctors: SpecialtiesDoctors[];
}

@Entity()
export class SpecialtiesDoctors {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(
    () => SpecialtyModel,
    (specialty: SpecialtyModel) => specialty.specialties_doctors,
  )
  public specialty: SpecialtyModel;
  @ManyToOne(
    () => DoctorModel,
    (doctor: DoctorModel) => doctor.specialties_doctors,
  )
  public doctor: DoctorModel;
}
