import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class SpecialtyModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 120 })
  name: string;
}
