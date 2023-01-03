import { ApiProperty } from '@nestjs/swagger';
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
  @ApiProperty()
  id: number;

  @Column({ unique: true })
  @ApiProperty()
  cep: string;

  @Column()
  @ApiProperty()
  street: string;

  @Column()
  @ApiProperty()
  complement: string;

  @Column()
  @ApiProperty()
  district: string;

  @Column()
  @ApiProperty()
  city: string;

  @Column()
  @ApiProperty()
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
