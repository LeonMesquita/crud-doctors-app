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
}

@Entity('specialties')
export class SpecialtyModel {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column({ length: 120, unique: true })
  @ApiProperty()
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
