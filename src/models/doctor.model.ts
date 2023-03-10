import { ApiProperty } from '@nestjs/swagger';
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
import { SpecialtyModel } from './specialty.model';

@Entity('doctors')
export class DoctorModel {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @ApiProperty()
  @Column({ length: 120, unique: true })
  name: string;

  @ApiProperty()
  @Column({ unique: true, length: 7 })
  crm: string;

  @ApiProperty()
  @Column({ unique: true, length: 8 })
  landline_number: string;

  @ApiProperty()
  @Column({ unique: true, length: 11 })
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
  @ApiProperty()
  specialties: SpecialtyModel[];

  @ManyToOne(() => AddressModel, { eager: true, cascade: true })
  @ApiProperty()
  address: AddressModel;

  constructor(doctor?: Partial<DoctorModel>) {
    this.id = doctor?.id;
    this.name = doctor?.name;
    this.crm = doctor?.crm;
    this.landline_number = doctor?.landline_number;
    this.mobile_number = doctor?.mobile_number;
    this.specialties = doctor?.specialties;
    this.address = doctor?.address;
  }
}
