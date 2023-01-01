import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  DeleteDateColumn,
  UpdateDateColumn,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { DoctorModel } from './doctor.model';

@Entity('addresses')
export class AddressModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  cep: string;

  @Column()
  street: string;

  @Column()
  complement: string;

  @Column()
  district: string;

  @Column()
  city: string;

  @Column()
  state: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @OneToMany(() => DoctorModel, (doctor) => doctor.address)
  doctors: DoctorModel[];
}
