/* eslint-disable prettier/prettier */
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  Brand: string;

  @Column()
  ItemCode: string;

  @Column()
  ItemCodeNew: string;

  @Column()
  ItemName: string;

  @Column()
  Model: string;

  @Column()
  RetailPrice: number;

  @Column()
  Qty: number;
  
  @Column()
  Grade3D: string;

  @Column()
  TimeStamp: string;


}
