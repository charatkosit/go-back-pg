/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { CreateLoggingDto } from './dto/create-logging.dto';
import { UpdateLoggingDto } from './dto/update-logging.dto';
import { Logging } from './entities/logging.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class LoggingService {

  constructor(
    @InjectRepository(Logging)
    private loggingRepository: Repository<Logging>
  ) { }

  async create(createLoggingDto: CreateLoggingDto) {
    const logging = new Logging();
    logging.Log_Path = createLoggingDto.Log_Path;
    // logging.Log_Method = createLoggingDto.Log_Method;
    // logging.Log_Body = createLoggingDto.Log_Body;
    // logging.Log_Timestamp = createLoggingDto.Log_Timestamp;

    return await this.loggingRepository.save(logging);
  }

  findAll() {
    return `This action returns all logging`;
  }

  findOne(id: number) {
    return `This action returns a #${id} logging`;
  }

  update(id: number, updateLoggingDto: UpdateLoggingDto) {
    return `This action updates a #${id} logging`;
  }

  remove(id: number) {
    return `This action removes a #${id} logging`;
  }

  // formatTimestamp(timestamp: number): string {
  //   const date = new Date(timestamp);
  //   const day = date.toLocaleDateString();
  //   const time = date.toLocaleTimeString();
  //   return `${day} ${time}`;
  // }
  formatTimestamp(timestamp: number): string {
    const date = new Date(timestamp);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    
    return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
  }
}
