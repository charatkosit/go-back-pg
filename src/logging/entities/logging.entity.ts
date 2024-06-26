/* eslint-disable prettier/prettier */
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Logging {
    @PrimaryGeneratedColumn()
    Log_Id: number;


    @Column()
    Log_Path: string;
  
    @Column()
    Log_Method: string;
  
    @Column('text')
    Log_Body: string;

    @Column()
    Log_By: string;
  
    @Column()
    Log_Timestamp: string;
}
