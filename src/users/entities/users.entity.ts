/* eslint-disable prettier/prettier */
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  UserId: number;

  @Column()
  FullName: string;

  @Column()
  CodeUserId: string;

  @Column({select: false})
  email: string;

  @Column({select:false})
  Password: string;

  @Column({default: 'member'})
  Permission: string;



}
