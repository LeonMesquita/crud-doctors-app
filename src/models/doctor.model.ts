import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  JoinTable,
  ManyToMany,
  DeleteDateColumn,
  UpdateDateColumn,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';
import { AddressModel } from './address.model';

@Entity('doctors')
export class DoctorModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 120, unique: true })
  name: string;

  @Column({ unique: true, length: 7 })
  crm: string;

  @Column({ unique: true })
  landline_number: string;

  @Column({ unique: true })
  mobile_number: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @ManyToMany(() => SpecialtyModel, {
    eager: true,
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinTable()
  specialties: SpecialtyModel[];

  @ManyToOne(() => AddressModel, { eager: true, cascade: true })
  address: AddressModel;
}

@Entity('specialties')
export class SpecialtyModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 120, unique: true })
  name: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @ManyToMany(() => DoctorModel)
  @JoinTable()
  doctors: DoctorModel[];
}
