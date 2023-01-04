import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { DoctorModel } from './doctor.model';

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
