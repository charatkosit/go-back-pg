/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, Query } from '@nestjs/common';
import { LoggingService } from './logging.service';
import { CreateLoggingDto } from './dto/create-logging.dto';
import { UpdateLoggingDto } from './dto/update-logging.dto';
import { LoggingPagination } from 'src/interfaces/LoggingPagination';

@Controller({
  version : '1',
  path: 'logging'
})

export class LoggingController {
  constructor(private readonly loggingService: LoggingService) {}

  @Post()
  create(@Body() createLoggingDto: CreateLoggingDto) {
    return this.loggingService.create(createLoggingDto);
  }

  //localhost:3000/api/v1/auth/pagination
  @Post('pagination')
  async findAllWithPagination(@Query() query:LoggingPagination){

    console.log(query)
    let code:number;
    let message:string;
    let counter = 100;
  
  
    
    const result = await this.loggingService.findAllWithPagination(query.page, query.page_size, query.searchPath, query.searchBody, query.searchUser, query.searchTime)
    const total = await this.loggingService.total(query.searchPath, query.searchBody, query.searchUser, query.searchTime)
    
   console.log(total[0].total)
   counter= total[0].total

    if (counter == 0) {
        code =HttpStatus.NOT_FOUND;
        message='Not Found';  
    }else {
        code =HttpStatus.OK;
        message='OK';
    }
    
    return {
      code: code,
      message: message,
      resultFound: counter,
      data: result
    } 
  }

  @Get()
  findAll() {
    return this.loggingService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.loggingService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLoggingDto: UpdateLoggingDto) {
    return this.loggingService.update(+id, updateLoggingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.loggingService.remove(+id);
  }
}
