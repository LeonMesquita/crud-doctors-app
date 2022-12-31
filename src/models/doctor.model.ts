import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  JoinTable,
  ManyToMany,
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
  @ManyToMany(() => SpecialtyModel, { eager: true })
  @JoinTable()
  specialties: SpecialtyModel[];
}

@Entity('specialties')
export class SpecialtyModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 120, unique: true })
  name: string;
  @ManyToMany(() => DoctorModel)
  @JoinTable()
  doctors: DoctorModel[];
}
