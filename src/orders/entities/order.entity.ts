/* eslint-disable prettier/prettier */
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  order_id: number;

  @Column()
  cus_id: string;

  @Column()
  date_time: string;

  @Column()
  bill_to: string;

  @Column()
  transportation: string;

  @Column()
  ship_to: string;

  @Column()
  credit: number;

  @Column()
  sum_amountSale: number;

  @Column({select:false})
  sum_amountRTP: number;

  @Column()
  sum_discount: number;

  @Column()
  total: number;

  @Column()
  vat: number;

  @Column()
  grand_total: number;




  
}
