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
    logging.Log_Method = createLoggingDto.Log_Method;
    logging.Log_Body = createLoggingDto.Log_Body;
    logging.Log_Timestamp = createLoggingDto.Log_Timestamp;

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
}
