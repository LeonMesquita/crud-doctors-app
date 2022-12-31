import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
  JoinTable,
} from 'typeorm';

@Entity('doctors')
export class DoctorModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 120 })
  name: string;

  @Column({ unique: true, length: 7 })
  crm: string;

  @Column({ unique: true })
  landline_number: string;

  @Column({ unique: true })
  mobile_number: string;

  @Column()
  cep: string;

  @OneToMany(
    () => SpecialtiesDoctors,
    (specialties_doctors: SpecialtiesDoctors) => specialties_doctors.specialty,
  )
  @JoinTable()
  public specialties_doctors: SpecialtiesDoctors[];
}

@Entity('specialties')
export class SpecialtyModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 120, unique: true })
  name: string;

  @OneToMany(
    () => SpecialtiesDoctors,
    (specialties_doctors: SpecialtiesDoctors) => specialties_doctors.specialty,
  )
  @JoinTable()
  public specialties_doctors: SpecialtiesDoctors[];
}

@Entity('specialties_doctors')
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
  @JoinTable()
  public doctor: DoctorModel;
}
